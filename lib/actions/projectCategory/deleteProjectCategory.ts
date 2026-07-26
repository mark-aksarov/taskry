"use server";

import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { projectCategoryId } from "@/lib/schemas/projectCategory";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { deleteProjectCategories as deleteProjectCategoriesQuery } from "@/lib/data/projectCategory/projectCategory.dal";

export async function deleteProjectCategory(id: number): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t(
    "projectCategory.delete.error.internalServerError",
  );

  // Validation
  const result = projectCategoryId.safeParse(id);

  if (!result.success) {
    return {
      status: "error",
      // This id does not come from a user form, so the user cannot fix invalid input
      message: internalServerError,
    };
  }

  // Delete project category
  try {
    await deleteProjectCategoriesQuery([result.data]);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("projectCategory.delete.success"),
  };
}
