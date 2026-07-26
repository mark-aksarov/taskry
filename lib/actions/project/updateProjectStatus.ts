"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { projectId, projectStatus } from "@/lib/schemas/project";
import { ActionState, UpdateProjectStatusPayload } from "../types";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { updateProjectStatuses as updateProjectStatusesQuery } from "@/lib/data/project/project.dal";

const schema = z.object({
  id: projectId,
  nextStatus: projectStatus,
});

export async function updateProjectStatus(
  payload: UpdateProjectStatusPayload,
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t(
    "project.updateStatus.error.internalServerError",
  );

  // Validation
  const result = schema.safeParse(payload);

  if (!result.success) {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  const { id, nextStatus } = result.data;

  // Update project
  try {
    await updateProjectStatusesQuery([id], nextStatus);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("project.updateStatus.success"),
  };
}
