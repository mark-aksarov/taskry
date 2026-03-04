"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { companyId } from "@/lib/schemas/company";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { deleteCompanies as deleteCompaniesQuery } from "@/lib/data/company/company.dal";

const companyIds = z.array(companyId).min(1);

export async function deleteCompanies(
  _prevState: ActionState,
  ids: number[],
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedIds = companyIds.parse(ids);
    await deleteCompaniesQuery(parsedIds);

    revalidatePath("/companies");

    return {
      status: "success",
      message: t("company.delete.success.many"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("company.delete.error.many"),
    };
  }
}
