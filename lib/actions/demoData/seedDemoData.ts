"use server";

import { ActionState } from "../types";
import { ValidationError } from "@/lib/data/utils/error";
import { getLocale, getTranslations } from "next-intl/server";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { seedDemoData as seedDemoDataQuery } from "@/lib/data/demoData/demoData.dal";

export async function seedDemoData(): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const locale = await getLocale();

  // Seed data
  try {
    await seedDemoDataQuery(locale);
  } catch (error) {
    console.log(error);

    if (error instanceof ValidationError) {
      return {
        status: "error",
        message: t("demoData.create.error.workspaceNotEmpty"),
      };
    }

    return {
      status: "error",
      message: t("demoData.create.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("demoData.create.success"),
  };
}
