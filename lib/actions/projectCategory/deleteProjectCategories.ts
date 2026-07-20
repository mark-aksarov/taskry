"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { projectCategoryId } from "@/lib/schemas/projectCategory";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { deleteProjectCategories as deleteProjectCategoriesQuery } from "@/lib/data/projectCategory/projectCategory.dal";

const projectCategoryIds = z.array(projectCategoryId).min(1);

export async function deleteProjectCategories(
  ids: number[],
): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const parsedIds = projectCategoryIds.parse(ids);

    await deleteProjectCategoriesQuery(parsedIds);

    return {
      status: "success",
      message: t("projectCategory.deleteMany.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("projectCategory.deleteMany.error.internalServerError"),
    };
  }
}
