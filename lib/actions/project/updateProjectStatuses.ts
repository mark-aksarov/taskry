"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { ProjectStatus } from "@/generated/prisma/enums";
import { projectId, projectStatus } from "@/lib/schemas/project";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateProjectStatuses as updateProjectStatusesQuery } from "@/lib/data/project/project.dal";

const schema = z.object({
  ids: z.array(projectId).min(1),
  nextStatus: projectStatus,
});

export async function updateProjectStatuses(
  _prevState: ActionState,
  { ids, nextStatus }: { ids: number[]; nextStatus: ProjectStatus },
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  let parsedIds: number[] = [];

  try {
    const parsedData = schema.parse({ ids, nextStatus });
    parsedIds = parsedData.ids;
    await updateProjectStatusesQuery(parsedData.ids, parsedData.nextStatus);
    revalidatePath("/projects");

    return {
      status: "success",
      message:
        parsedIds.length > 1
          ? t("project.updateStatus.success.many")
          : t("project.updateStatus.success.one"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message:
        parsedIds.length > 1
          ? t("project.updateStatus.error.many")
          : t("project.updateStatus.error.one"),
    };
  }
}
