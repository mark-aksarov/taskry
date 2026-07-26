"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { projectCategoryId } from "@/lib/schemas/projectCategory";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { deleteProjectCategories as deleteProjectCategoriesQuery } from "@/lib/data/projectCategory/projectCategory.dal";

const projectCategoryIds = z.array(projectCategoryId).min(1);

export async function deleteProjectCategories(
  ids: number[],
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t(
    "projectCategory.deleteMany.error.internalServerError",
  );

  // Validation
  const result = projectCategoryIds.safeParse(ids);

  if (!result.success) {
    return {
      status: "error",
      // This ids does not come from a user form, so the user cannot fix invalid input
      message: internalServerError,
    };
  }

  // Delete project categories
  try {
    await deleteProjectCategoriesQuery(result.data);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("projectCategory.deleteMany.success"),
  };
}
