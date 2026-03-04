"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { companyId } from "@/lib/schemas/company";
import { getTranslations } from "next-intl/server";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { deleteCompanies as deleteCompaniesQuery } from "@/lib/data/company/company.dal";

export async function deleteCompany(
  _prevState: ActionState,
  id: number,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedId = companyId.parse(id);
    await deleteCompaniesQuery([parsedId]);

    revalidatePath("/companies");

    return {
      status: "success",
      message: t("company.delete.success.one"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("company.delete.error.one"),
    };
  }
}
