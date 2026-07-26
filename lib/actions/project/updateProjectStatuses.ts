"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { projectId, projectStatus } from "@/lib/schemas/project";
import { ActionState, UpdateProjectStatusesPayload } from "../types";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { updateProjectStatuses as updateProjectStatusesQuery } from "@/lib/data/project/project.dal";

const schema = z.object({
  ids: z.array(projectId).min(1),
  nextStatus: projectStatus,
});

export async function updateProjectStatuses(
  payload: UpdateProjectStatusesPayload,
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t(
    "project.updateStatuses.error.internalServerError",
  );

  // Validation
  const result = schema.safeParse(payload);

  if (!result.success) {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  const { ids, nextStatus } = result.data;

  // Update project
  try {
    await updateProjectStatusesQuery(ids, nextStatus);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("project.updateStatuses.success"),
  };
}
