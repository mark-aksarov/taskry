"use server";

import {
  projectCategoryId,
  projectCategoryName,
} from "@/lib/schemas/projectCategory";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { updateProjectCategory as updateProjectCategoryQuery } from "@/lib/data/projectCategory/projectCategory.dal";

const schema = z.object({
  id: projectCategoryId,
  name: projectCategoryName,
});

export async function updateProjectCategory(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");

  // Validation
  const input = Object.fromEntries(formData.entries());
  const result = schema.safeParse(input);

  if (!result.success) {
    return {
      status: "error",
      message: t("common.error.invalidData"),
    };
  }

  // Update project
  try {
    await updateProjectCategoryQuery(result.data);
  } catch {
    return {
      status: "error",
      message: t("projectCategory.update.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("projectCategory.update.success"),
  };
}
