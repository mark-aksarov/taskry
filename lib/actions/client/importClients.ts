"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { parseCsvFile } from "@/lib/utils/parseCsvFile";
import { CUSTOMER_MAX_COUNT } from "@/lib/data/constants";
import { LimitExceededError } from "@/lib/data/utils/error";
import { createClientSchema } from "@/lib/schemas/client";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { createClients as createClientsQuery } from "@/lib/data/client/client.dal";

const schema = z.array(createClientSchema.strict()).min(1);

export async function importClients(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw new Error("File is required");
    }

    const parsedData = await parseCsvFile(file, schema);
    await createClientsQuery(parsedData);

    return {
      status: "success",
      message: t("client.import.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

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
      message: t("client.import.error.internalServerError"),
    };
  }
}
