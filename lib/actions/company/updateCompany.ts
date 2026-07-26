"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { companyId, companyName } from "@/lib/schemas/company";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { updateCompany as updateCompanyQuery } from "@/lib/data/company/company.dal";

const schema = z.object({
  id: companyId,
  name: companyName,
});

export async function updateCompany(formData: FormData): Promise<ActionState> {
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

  // Update company
  try {
    await updateCompanyQuery(result.data);
  } catch {
    return {
      status: "error",
      message: t("company.update.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("company.update.success"),
  };
}
