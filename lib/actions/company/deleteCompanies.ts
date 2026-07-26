"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { companyId } from "@/lib/schemas/company";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { deleteCompanies as deleteCompaniesQuery } from "@/lib/data/company/company.dal";

const companyIds = z.array(companyId).min(1);

export async function deleteCompanies(ids: number[]): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("company.deleteMany.error.internalServerError");

  // Validation
  const result = companyIds.safeParse(ids);

  if (!result.success) {
    return {
      status: "error",
      // This ids does not come from a user form, so the user cannot fix invalid input
      message: internalServerError,
    };
  }

  // Delete companies
  try {
    await deleteCompaniesQuery(result.data);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("company.deleteMany.success"),
  };
}
