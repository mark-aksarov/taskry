"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { projectId, projectStatus } from "@/lib/schemas/project";
import { ActionState, UpdateProjectStatusPayload } from "../types";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { updateProjectStatuses as updateProjectStatusesQuery } from "@/lib/data/project/project.dal";

const schema = z.object({
  id: projectId,
  nextStatus: projectStatus,
});

export async function updateProjectStatus(
  payload: UpdateProjectStatusPayload,
): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const parsedData = schema.parse(payload);
    await updateProjectStatusesQuery([parsedData.id], parsedData.nextStatus);

    return {
      status: "success",
      message: t("project.updateStatus.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("project.updateStatus.error.internalServerError"),
    };
  }
}
