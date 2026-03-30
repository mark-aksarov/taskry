"use server";

import z from "zod";
import { getTranslations } from "next-intl/server";
import { projectId, projectStatus } from "@/lib/schemas/project";
import { ActionState, UpdateProjectStatusPayload } from "../types";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateProjectStatuses as updateProjectStatusesQuery } from "@/lib/data/project/project.dal";

const schema = z.object({
  id: projectId,
  nextStatus: projectStatus,
});

export async function updateProjectStatus(
  payload: UpdateProjectStatusPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedData = schema.parse(payload);
    const result = await updateProjectStatusesQuery(
      [parsedData.id],
      parsedData.nextStatus,
    );

    if (!result.length) {
      return {
        status: "error",
        errorCode: "notFound",
        message: t("project.common.error.notFound"),
      };
    }

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
