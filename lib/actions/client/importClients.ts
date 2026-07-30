"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { companyName } from "@/lib/schemas/company";
import { parseCsvFile } from "@/lib/utils/parseCsvFile";
import { CUSTOMER_MAX_COUNT } from "@/lib/data/constants";
import { createClientSchema } from "@/lib/schemas/client";
import { emptyStringToUndefined } from "@/lib/schemas/base";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { LimitExceededError, NotFoundError } from "@/lib/data/utils/error";
import { importClients as importClientsQuery } from "@/lib/data/client/client.dal";

const schema = z
  .array(
    createClientSchema
      .omit({ companyId: true })
      .extend({
        companyName: z.preprocess(
          emptyStringToUndefined,
          companyName.optional(),
        ),
      })
      .strict(),
  )
  .min(1);

export async function importClients(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("client.import.error.internalServerError");

  // Extract file from form data
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  // Parse and validate CSV data
  const result = await parseCsvFile(file, schema);

  if (!result.success) {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  // Create clients
  try {
    await importClientsQuery(result.data);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return {
        status: "error",
        message: t("client.import.error.notFoundError"),
      };
    }

    if (error instanceof LimitExceededError) {
      return {
        status: "error",
        message: t("client.import.error.limitExceededError", {
          count: CUSTOMER_MAX_COUNT,
        }),
      };
    }

    return {
      status: "error",
      message: internalServerError,
    };
  }

  // Return success response
  return {
    status: "success",
    message: t("client.import.success"),
  };
}
