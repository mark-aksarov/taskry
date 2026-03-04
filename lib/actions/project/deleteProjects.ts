"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { projectId } from "@/lib/schemas/project";
import { getTranslations } from "next-intl/server";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { deleteProjects as deleteProjectQuery } from "@/lib/data/project/project.dal";

const projectIds = z.array(projectId).min(1);

export async function deleteProjects(
  _prevState: ActionState,
  ids: number[],
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedIds = projectIds.parse(ids);

    await deleteProjectQuery(parsedIds);
    revalidatePath("/projects");

    return {
      status: "success",
      message: t("project.delete.success.many"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("project.delete.error.many"),
    };
  }
}
