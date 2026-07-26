"use server";

import {
  projectId,
  projectTitle,
  projectStatus,
  projectDeadline,
  projectDescription,
} from "@/lib/schemas/project";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { clientId } from "@/lib/schemas/client";
import { emptyStringToNull } from "@/lib/schemas/base";
import { projectCategoryId } from "@/lib/schemas/projectCategory";
import { updateProject as updateProjectQuery } from "@/lib/data/project/project.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";

const schema = z.object({
  id: projectId,
  title: projectTitle.optional(),
  description: z
    .preprocess(emptyStringToNull, projectDescription.nullable())
    .optional(),
  deadline: projectDeadline.optional(),
  status: projectStatus.optional(),
  categoryId: z
    .preprocess(emptyStringToNull, projectCategoryId.nullable())
    .optional(),
  clientId: z.preprocess(emptyStringToNull, clientId.nullable()).optional(),
});

export async function updateProject(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");

  // Validation
  const input = Object.fromEntries(formData.entries());
  const result = schema.safeParse(input);

  if (!result.success) {
    return {
      status: "error",
      message: t("common.error.invalidData"),
    };
  }

  // Update project
  try {
    await updateProjectQuery(result.data);
  } catch {
    return {
      status: "error",
      message: t("project.update.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("project.update.success"),
  };
}
