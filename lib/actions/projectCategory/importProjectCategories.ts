"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { parseCsvFile } from "@/lib/utils/parseCsvFile";
import { LimitExceededError } from "@/lib/data/utils/error";
import { PROJECT_CATEGORY_MAX_COUNT } from "@/lib/data/constants";
import { projectCategoryName } from "@/lib/schemas/projectCategory";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { createProjectCategories as createProjectCategoriesQuery } from "@/lib/data/projectCategory/projectCategory.dal";

const schema = z.array(z.object({ name: projectCategoryName }).strict()).min(1);

export async function importProjectCategories(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t(
    "projectCategory.import.error.internalServerError",
  );

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

  // Create project categories
  try {
    await createProjectCategoriesQuery(result.data);
  } catch (error) {
    if (error instanceof LimitExceededError) {
      return {
        status: "error",
        message: t("projectCategory.import.error.limitExceededError", {
          count: PROJECT_CATEGORY_MAX_COUNT,
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
    message: t("projectCategory.import.success"),
  };
}
