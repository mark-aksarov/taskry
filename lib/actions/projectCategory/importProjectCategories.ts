"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { parseCsvFile } from "@/lib/utils/parseCsvFile";
import { LimitExceededError } from "@/lib/data/utils/error";
import { PROJECT_CATEGORY_MAX_COUNT } from "@/lib/data/constants";
import { projectCategoryName } from "@/lib/schemas/projectCategory";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { createProjectCategories as createProjectCategoryQueries } from "@/lib/data/projectCategory/projectCategory.dal";

const schema = z.array(z.object({ name: projectCategoryName }).strict()).min(1);

export async function importProjectCategories(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw new Error("File is required");
    }

    const parsedData = await parseCsvFile(file, schema);
    await createProjectCategoryQueries(parsedData);

    return {
      status: "success",
      message: t("projectCategory.import.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

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
      message: t("projectCategory.import.error.internalServerError"),
    };
  }
}
