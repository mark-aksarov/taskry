"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { coercedPositiveInt } from "@/lib/schemas/base";
import { deleteTasks as deleteTasksQuery } from "@/lib/data/task/task.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = z.object({
  ids: z.array(coercedPositiveInt).min(1),
});

export async function deleteTasks(
  _prevState: ActionState,
  ids: number[],
): Promise<ActionState> {
  const locale = await getLocale();

  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const parsed = schema.safeParse({ ids });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Delete tasks
    await deleteTasksQuery(parsed.data.ids);
    revalidatePath("/tasks");
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      errorCode: "internalServerError",
    };
  }

  // Redirect to check email
  redirect({
    href: "/tasks",
    locale,
  });

  return {
    status: "success",
  };
}
