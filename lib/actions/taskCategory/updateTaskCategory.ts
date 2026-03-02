"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { taskCategoryId, taskCategoryName } from "@/lib/schemas/taskCategory";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateTaskCategory as updateTaskCategoryQuery } from "@/lib/data/taskCategory/taskCategory.dal";

const schema = z.object({
  id: taskCategoryId,
  name: taskCategoryName,
});

export async function updateTaskCategory(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    await updateTaskCategoryQuery(parsedData);
    revalidatePath("/task-categories");

    return {
      status: "success",
      message: t("taskCategory.update.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("taskCategory.update.error"),
    };
  }
}
