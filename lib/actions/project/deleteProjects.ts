"use server";

import z from "zod";
import { ActionState } from "../types";
import { projectId } from "@/lib/schemas/project";
import { getTranslations } from "next-intl/server";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { deleteProjects as deleteProjectQuery } from "@/lib/data/project/project.dal";

const projectIds = z.array(projectId).min(1);

export async function deleteProjects(ids: number[]): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const parsedIds = projectIds.parse(ids);

    await deleteProjectQuery(parsedIds);

    return {
      status: "success",
      message: t("project.deleteMany.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("project.deleteMany.error.internalServerError"),
    };
  }
}
