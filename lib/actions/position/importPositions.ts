"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { positionName } from "@/lib/schemas/position";
import { parseCsvFile } from "@/lib/utils/parseCsvFile";
import { COMPANY_MAX_COUNT } from "@/lib/data/constants";
import { LimitExceededError } from "@/lib/data/utils/error";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { createPositions as createPositionsQuery } from "@/lib/data/position/position.dal";

const schema = z.array(z.object({ name: positionName })).min(1);

export async function importPositions(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("position.import.error.internalServerError");

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

  try {
    await createPositionsQuery(result.data);
  } catch (error) {
    if (error instanceof LimitExceededError) {
      return {
        status: "error",
        message: t("position.import.error.limitExceededError", {
          count: COMPANY_MAX_COUNT,
        }),
      };
    }

    return {
      status: "error",
      message: t("position.import.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("position.import.success"),
  };
}
