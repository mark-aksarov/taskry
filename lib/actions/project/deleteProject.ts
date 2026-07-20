"use server";

import { redirect } from "@/i18n/navigation";
import { projectId } from "@/lib/schemas/project";
import { ActionState, DeleteProjectPayload } from "../types";
import { getLocale, getTranslations } from "next-intl/server";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { deleteProjects as deleteProjectQuery } from "@/lib/data/project/project.dal";

export async function deleteProject(
  payload: DeleteProjectPayload,
): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const parsedId = projectId.parse(payload.id);

    await deleteProjectQuery([parsedId]);
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("project.delete.error.internalServerError"),
    };
  }

  const locale = await getLocale();

  if (payload.shouldRedirect) {
    redirect({ href: "/projects", locale });
  }

  return {
    status: "success",
    message: t("project.delete.success"),
  };
}
