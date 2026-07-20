"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { taskCategoryId, taskCategoryName } from "@/lib/schemas/taskCategory";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { updateTaskCategory as updateTaskCategoryQuery } from "@/lib/data/taskCategory/taskCategory.dal";

const schema = z.object({
  id: taskCategoryId,
  name: taskCategoryName,
});

export async function updateTaskCategory(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    await updateTaskCategoryQuery(parsedData);

    return {
      status: "success",
      message: t("taskCategory.update.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("taskCategory.update.error.internalServerError"),
    };
  }
}
