"use server";

import { ActionState } from "../types";
import { companyId } from "@/lib/schemas/company";
import { getTranslations } from "next-intl/server";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { deleteCompanies as deleteCompaniesQuery } from "@/lib/data/company/company.dal";

export async function deleteCompany(id: number): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const parsedId = companyId.parse(id);
    await deleteCompaniesQuery([parsedId]);

    return {
      status: "success",
      message: t("company.delete.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("company.delete.error.internalServerError"),
    };
  }
}
