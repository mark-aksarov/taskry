"use server";

import z from "zod";
import { auth } from "../auth";
import { ActionState } from "./types";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { TaskStatus } from "@/generated/prisma/enums";
import { updateTaskStatuses as updateTaskStatusesQuery } from "../dal/task";

const schema = z.object({
  ids: z.array(z.coerce.number().int().positive()).min(1),
  nextStatus: z.enum(["active", "completed", "pending"]),
});

export async function updateTaskStatuses(
  _prevState: ActionState,
  {
    ids,
    nextStatus,
  }: {
    ids: number[];
    nextStatus: string;
  },
): Promise<ActionState> {
  const t = await getTranslations("actions.updateTaskStatus");
  const errorResponse: ActionState = {
    status: "error",
    message: t("error"),
  };

  try {
    // Authorization
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      console.error("Unauthorized");
      return errorResponse;
    }

    // Validation
    const { success, error } = schema.safeParse({ ids, nextStatus });
    if (!success) {
      console.error("Invalid data", error);
      return errorResponse;
    }

    // Update Status

    await updateTaskStatusesQuery(ids, nextStatus as TaskStatus);

    revalidatePath("/tasks");

    return { status: "success", message: null };
  } catch (error) {
    console.error("Update Project Status Error:", error);
    return errorResponse;
  }
}
