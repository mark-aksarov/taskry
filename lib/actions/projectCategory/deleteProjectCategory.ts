"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { projectCategoryId } from "@/lib/schemas/projectCategory";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { deleteProjectCategories as deleteProjectCategoriesQuery } from "@/lib/data/projectCategory/projectCategory.dal";

export async function deleteProjectCategory(
  _prevState: ActionState,
  id: number,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedId = projectCategoryId.parse(id);

    await deleteProjectCategoriesQuery([parsedId]);
    revalidatePath("/project-categories");

    return {
      status: "success",
      message: t("projectCategory.delete.success.one"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("projectCategory.delete.error.one"),
    };
  }
}
