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

  try {
    const parsedIds = projectIds.parse(payload.ids);

    await deleteProjectQuery(parsedIds);
    revalidatePath("/projects");
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("deleteProject.error.internalServerError"),
    };
  }

  const locale = await getLocale();

  if (payload.shouldRedirect) {
    redirect({ href: "/projects", locale });
  }

  return {
    status: "success",
  };
}
