"use server";

import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

export async function importCompanies(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    //parse csv file
    //validate file
    //validate companies
    //create companies

    return {
      status: "success",
      message: t("company.import.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("company.import.error.internalServerError"),
    };
  }
}
