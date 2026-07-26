"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { parseCsvFile } from "@/lib/utils/parseCsvFile";
import { PROJECT_MAX_COUNT } from "@/lib/data/constants";
import { createProjectSchema } from "@/lib/schemas/project";
import { LimitExceededError } from "@/lib/data/utils/error";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { createProjects as createProjectsQuery } from "@/lib/data/project/project.dal";

const schema = z.array(createProjectSchema.strict()).min(1);

export async function importProjects(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("project.import.error.internalServerError");

  // Extract file from form data
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  // Parse and validate CSV data
  const result = await parseCsvFile(file, schema);

  if (!result.success) {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  // Create projects
  try {
    await createProjectsQuery(result.data);
  } catch (error) {
    if (error instanceof LimitExceededError) {
      return {
        status: "error",
        message: t("project.import.error.limitExceededError", {
          count: PROJECT_MAX_COUNT,
        }),
      };
    }

    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("project.import.success"),
  };
}
