"use server";

import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { projectCategoryId } from "@/lib/schemas/projectCategory";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { deleteProjectCategories as deleteProjectCategoriesQuery } from "@/lib/data/projectCategory/projectCategory.dal";

export async function deleteProjectCategory(id: number): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const parsedId = projectCategoryId.parse(id);

    await deleteProjectCategoriesQuery([parsedId]);

    return {
      status: "success",
      message: t("projectCategory.delete.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("projectCategory.delete.error.internalServerError"),
    };
  }
}
