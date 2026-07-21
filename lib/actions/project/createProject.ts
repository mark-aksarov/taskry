"use server";

import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { createProjectSchema } from "@/lib/schemas/project";
import { createProjects as createProjectsQuery } from "@/lib/data/project/project.dal";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { LimitExceededError } from "@/lib/data/utils/error";
import { PROJECT_MAX_COUNT } from "@/lib/data/constants";

export async function createProject(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = createProjectSchema.parse(input);

    await createProjectsQuery([parsedData]);

    return {
      status: "success",
      message: t("project.create.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

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
}
