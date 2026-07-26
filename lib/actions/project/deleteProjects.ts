"use server";

import z from "zod";
import { ActionState } from "../types";
import { projectId } from "@/lib/schemas/project";
import { getTranslations } from "next-intl/server";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { deleteProjects as deleteProjectQuery } from "@/lib/data/project/project.dal";

const projectIds = z.array(projectId).min(1);

export async function deleteProjects(ids: number[]): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("project.deleteMany.error.internalServerError");

  // Validation
  const result = projectIds.safeParse(ids);

  if (!result.success) {
    return {
      status: "error",
      // This ids does not come from a user form, so the user cannot fix invalid input
      message: internalServerError,
    };
  }

  // Delete projects
  try {
    await deleteProjectQuery(result.data);
  } catch {
    return {
      status: "error",
      message: t("project.deleteMany.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("project.deleteMany.success"),
  };
}
