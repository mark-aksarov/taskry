"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { companyId, companyName } from "@/lib/schemas/company";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateCompany as updateCompanyQuery } from "@/lib/data/company/company.dal";

const schema = z.object({
  id: companyId,
  name: companyName,
});

export async function updateCompany(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const data = schema.parse(input);

    await updateCompanyQuery(data);

    return {
      status: "success",
      message: t("company.update.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("company.update.error.internalServerError"),
    };
  }
}
