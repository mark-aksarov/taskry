"use server";

import z from "zod";
import { auth } from "../auth";
import { ActionState } from "./types";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { deleteTasks as deleteTasksQuery } from "../dal/task";

const schema = z.object({
  ids: z.array(z.coerce.number().int().positive()).min(1),
});

export async function deleteTasks(
  _prevState: ActionState,
  ids: number[],
): Promise<ActionState> {
  const t = await getTranslations("actions.deleteTaskAction");
  const errorResponse: ActionState = {
    status: "error",
    message: t("error"),
  };

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      console.error("Unauthorized");
      return errorResponse;
    }

    // Validation
    const validated = schema.safeParse({ ids });
    if (!validated.success) {
      console.error("Invalid task IDs", validated.error);
      return errorResponse;
    }

    // Execute delete
    await deleteTasksQuery(ids);

    revalidatePath("/tasks");

    return {
      status: "success",
      message: null,
    };
  } catch (error) {
    console.error("Delete Task Error:", error);
    return errorResponse;
  }
}
