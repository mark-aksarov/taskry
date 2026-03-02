"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { projectCategoryId } from "@/lib/schemas/projectCategory";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { deleteProjectCategories as deleteProjectCategoriesQuery } from "@/lib/data/projectCategory/projectCategory.dal";

const projectCategoryIds = z.array(projectCategoryId).min(1);

export async function deleteProjectCategories(
  _prevState: ActionState,
  ids: number[],
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  let parsedIds: number[] = [];
  try {
    parsedIds = projectCategoryIds.parse(ids);

    await deleteProjectCategoriesQuery(parsedIds);
    revalidatePath("/project-categories");

    return {
      status: "success",
      message:
        parsedIds.length > 1
          ? t("projectCategory.delete.success.many")
          : t("projectCategory.delete.success.one"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message:
        parsedIds.length > 1
          ? t("projectCategory.delete.error.many")
          : t("projectCategory.delete.error.one"),
    };
  }
}
