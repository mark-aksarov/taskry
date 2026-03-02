"use server";

import z from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "@/i18n/navigation";
import { projectId } from "@/lib/schemas/project";
import { ActionState, DeleteProjectsPayload } from "../types";
import { getLocale, getTranslations } from "next-intl/server";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { deleteProjects as deleteProjectQuery } from "@/lib/data/project/project.dal";

const projectIds = z.array(projectId).min(1);

export async function deleteProjects(
  _prevState: ActionState,
  payload: DeleteProjectsPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  let parsedIds: number[] = [];

  try {
    parsedIds = projectIds.parse(payload.ids);

    await deleteProjectQuery(parsedIds);
    revalidatePath("/projects");
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message:
        parsedIds.length > 1
          ? t("project.delete.error.many")
          : t("project.delete.error.one"),
    };
  }

  const locale = await getLocale();

  if (payload.shouldRedirect) {
    redirect({ href: "/projects", locale });
  }

  return {
    status: "success",
    message:
      parsedIds.length > 1
        ? t("project.delete.success.many")
        : t("project.delete.success.one"),
  };
}
