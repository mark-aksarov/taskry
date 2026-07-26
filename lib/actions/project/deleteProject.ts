"use server";

import { redirect } from "@/i18n/navigation";
import { projectId } from "@/lib/schemas/project";
import { ActionState, DeleteProjectPayload } from "../types";
import { getLocale, getTranslations } from "next-intl/server";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { deleteProjects as deleteProjectQuery } from "@/lib/data/project/project.dal";

export async function deleteProject(
  payload: DeleteProjectPayload,
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("project.delete.error.internalServerError");

  // Validation
  const result = projectId.safeParse(payload.id);

  if (!result.success) {
    return {
      status: "error",
      // This id does not come from a user form, so the user cannot fix invalid input
      message: internalServerError,
    };
  }

  // Delete project
  try {
    await deleteProjectQuery([result.data]);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  // Success
  const locale = await getLocale();

  // Redirect to projects page when project is deleted from details page
  if (payload.shouldRedirect) {
    redirect({ href: "/projects", locale });
  }

  return {
    status: "success",
    message: t("project.delete.success"),
  };
}
