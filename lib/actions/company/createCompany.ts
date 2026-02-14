"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { companyName } from "@/lib/schemas/company";
import { createCompany as createCompanyQuery } from "@/lib/data/company/company.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = z.object({
  name: companyName,
});

export async function createCompany(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedDate = schema.parse({
      name: formData.get("name"),
    });

    await createCompanyQuery(parsedDate);
    revalidatePath("/companies");

    return {
      status: "success",
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("createCompany.error.internalServerError"),
    };
  }
}
