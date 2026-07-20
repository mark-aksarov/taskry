"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { parseCsvFile } from "@/lib/utils/parseCsvFile";
import { PROJECT_MAX_COUNT } from "@/lib/data/constants";
import { createProjectSchema } from "@/lib/schemas/project";
import { LimitExceededError } from "@/lib/data/utils/error";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { createProjects as createProjectQueries } from "@/lib/data/project/project.dal";

const schema = z.array(createProjectSchema.strict()).min(1);

export async function importProjects(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw new Error("File is required");
    }

    const parsedData = await parseCsvFile(file, schema);
    await createProjectQueries(parsedData);

    return {
      status: "success",
      message: t("project.import.success"),
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
      message: t("project.import.error.internalServerError"),
    };
  }
}
