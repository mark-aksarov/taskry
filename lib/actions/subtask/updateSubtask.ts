"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { subtaskId, subtaskText } from "@/lib/schemas/subtask";
import { updateSubtask as updateSubtaskQuery } from "@/lib/data/subtask/subtask.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { NotFoundError } from "@/lib/data/utils/error";

const schema = z.object({
  id: subtaskId,
  text: subtaskText,
});

export async function updateSubtask(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);
    await updateSubtaskQuery(parsedData);

    return {
      status: "success",
      message: t("subtask.update.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    if (error instanceof NotFoundError) {
      return {
        status: "error",
        errorCode: "notFound",
        message: t("subtask.common.error.notFound"),
      };
    }

    return {
      status: "error",
      message: t("subtask.update.error.internalServerError"),
    };
  }
}
