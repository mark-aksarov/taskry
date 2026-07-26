"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { companyName } from "@/lib/schemas/company";
import { COMPANY_MAX_COUNT } from "@/lib/data/constants";
import { LimitExceededError } from "@/lib/data/utils/error";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { createCompanies as createCompaniesQuery } from "@/lib/data/company/company.dal";

const schema = z.object({
  name: companyName,
});

export async function createCompany(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");

  // Validation
  const input = Object.fromEntries(formData.entries());
  const result = schema.safeParse(input);

  if (!result.success) {
    return {
      status: "error",
      message: t("common.error.invalidData"),
    };
  }

  // Create company
  try {
    await createCompaniesQuery([result.data]);
  } catch (error) {
    console.error("Server Action Error:", error);

    if (error instanceof LimitExceededError) {
      return {
        status: "error",
        message: t("company.create.error.limitExceededError", {
          count: COMPANY_MAX_COUNT,
        }),
      };
    }

    return {
      status: "error",
      message: t("company.create.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("company.create.success"),
  };
}
