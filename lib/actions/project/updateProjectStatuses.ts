"use server";

import z from "zod";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { projectId, projectStatus } from "@/lib/schemas/project";
import { ActionState, UpdateProjectStatusesPayload } from "../types";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateProjectStatuses as updateProjectStatusesQuery } from "@/lib/data/project/project.dal";

const schema = z.object({
  ids: z.array(projectId).min(1),
  nextStatus: projectStatus,
});

export async function updateProjectStatuses(
  _prevState: ActionState,
  payload: UpdateProjectStatusesPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedData = schema.parse(payload);
    await updateProjectStatusesQuery(parsedData.ids, parsedData.nextStatus);
    revalidatePath("/projects");

    return {
      status: "success",
      message: t("project.updateStatus.success.many"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("project.updateStatus.error.many"),
    };
  }
}
