"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { companyName } from "@/lib/schemas/company";
import { parseCsvFile } from "@/lib/utils/parseCsvFile";
import { COMPANY_MAX_COUNT } from "@/lib/data/constants";
import { LimitExceededError } from "@/lib/data/utils/error";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { createCompanies as createCompaniesQuery } from "@/lib/data/company/company.dal";

const schema = z.array(z.object({ name: companyName }).strict()).min(1);

export async function importCompanies(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("company.import.error.internalServerError");

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

  // Create companies
  try {
    await createCompaniesQuery(result.data);
  } catch (error) {
    if (error instanceof LimitExceededError) {
      return {
        status: "error",
        message: t("company.import.error.limitExceededError", {
          count: COMPANY_MAX_COUNT,
        }),
      };
    }

    return {
      status: "error",
      message: t("company.import.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("company.import.success"),
  };
}
