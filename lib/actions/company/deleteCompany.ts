"use server";

import { ActionState } from "../types";
import { companyId } from "@/lib/schemas/company";
import { getTranslations } from "next-intl/server";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { deleteCompanies as deleteCompaniesQuery } from "@/lib/data/company/company.dal";

export async function deleteCompany(id: number): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("company.delete.error.internalServerError");

  // Validation
  const result = companyId.safeParse(id);

  if (!result.success) {
    return {
      status: "error",
      // This id does not come from a user form, so the user cannot fix invalid input
      message: internalServerError,
    };
  }

  // Delete company
  try {
    await deleteCompaniesQuery([result.data]);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("company.delete.success"),
  };
}
