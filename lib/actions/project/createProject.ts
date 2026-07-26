"use server";

import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { createProjectSchema } from "@/lib/schemas/project";
import { createProjects as createProjectsQuery } from "@/lib/data/project/project.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { LimitExceededError } from "@/lib/data/utils/error";
import { PROJECT_MAX_COUNT } from "@/lib/data/constants";

export async function createProject(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");

  // Validation
  const input = Object.fromEntries(formData.entries());
  const result = createProjectSchema.safeParse(input);

  if (!result.success) {
    return {
      status: "error",
      message: t("common.error.invalidData"),
    };
  }

  // Create project
  try {
    await createProjectsQuery([result.data]);
  } catch (error) {
    if (error instanceof LimitExceededError) {
      return {
        status: "error",
        message: t("project.create.error.limitExceededError", {
          count: PROJECT_MAX_COUNT,
        }),
      };
    }

    return {
      status: "error",
      message: t("project.create.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("project.create.success"),
  };
}
