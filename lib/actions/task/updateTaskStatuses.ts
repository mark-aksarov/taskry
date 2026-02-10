"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { TaskStatus } from "@/generated/prisma/enums";
import { coercedPositiveInt } from "@/lib/schemas/base";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateTaskStatuses as updateTaskStatusesQuery } from "@/lib/data/task/task.dal";

const schema = z.object({
  ids: z.array(coercedPositiveInt).min(1),
  nextStatus: z.enum(TaskStatus),
});

export async function updateTaskStatuses(
  _prevState: ActionState,
  { ids, nextStatus }: { ids: number[]; nextStatus: TaskStatus },
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const parsed = schema.safeParse({ ids, nextStatus });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Update tasks
    await updateTaskStatusesQuery(parsed.data.ids, parsed.data.nextStatus);

    revalidatePath("/tasks");

    return {
      status: "success",
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      errorCode: "internalServerError",
    };
  }
}
