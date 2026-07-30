"use server";

import z from "zod";
import { ActionState } from "../types";
import { clientEmail } from "@/lib/schemas/client";
import { getTranslations } from "next-intl/server";
import { parseCsvFile } from "@/lib/utils/parseCsvFile";
import { PROJECT_MAX_COUNT } from "@/lib/data/constants";
import { createProjectSchema } from "@/lib/schemas/project";
import { emptyStringToUndefined } from "@/lib/schemas/base";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { projectCategoryName } from "@/lib/schemas/projectCategory";
import { LimitExceededError, NotFoundError } from "@/lib/data/utils/error";
import { importProjects as importProjectsQuery } from "@/lib/data/project/project.dal";

const schema = z
  .array(
    createProjectSchema
      .omit({ categoryId: true, clientId: true })
      .extend({
        categoryName: z.preprocess(
          emptyStringToUndefined,
          projectCategoryName.optional(),
        ),
        clientEmail: z.preprocess(
          emptyStringToUndefined,
          clientEmail.optional(),
        ),
      })
      .strict(),
  )
  .min(1);

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
    await importProjectsQuery(result.data);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return {
        status: "error",
        message: t("project.import.error.notFoundError"),
      };
    }

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
