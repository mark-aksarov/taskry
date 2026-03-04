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

  try {
    const parsedIds = projectCategoryIds.parse(ids);

    await deleteProjectCategoriesQuery(parsedIds);
    revalidatePath("/project-categories");

    return {
      status: "success",
      message: t("projectCategory.delete.success.many"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("projectCategory.delete.error.many"),
    };
  }
}
