"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { taskId } from "@/lib/schemas/task";
import { getTranslations } from "next-intl/server";
import { deleteTasks as deleteTaskQuery } from "@/lib/data/task/task.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const taskIds = z.array(taskId).min(1);

export async function deleteTasks(
  _prevState: ActionState,
  ids: number[],
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedIds = taskIds.parse(ids);

    await deleteTaskQuery(parsedIds);
    revalidatePath("/");

    return {
      status: "success",
      message: t("task.delete.success.many"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("task.delete.error.many"),
    };
  }
}
