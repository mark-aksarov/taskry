"use server";

import {
  projectTitle,
  projectStatus,
  projectDeadline,
  projectDescription,
} from "@/lib/schemas/project";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { customerId } from "@/lib/schemas/customer";
import { emptyStringToUndefined } from "@/lib/schemas/base";
import { projectCategoryId } from "@/lib/schemas/projectCategory";
import { createProject as createProjectQuery } from "@/lib/data/project/project.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = z.object({
  title: projectTitle,
  description: z.preprocess(
    emptyStringToUndefined,
    projectDescription.optional(),
  ),
  deadline: projectDeadline,
  status: projectStatus,
  categoryId: z.preprocess(
    emptyStringToUndefined,
    projectCategoryId.optional(),
  ),
  customerId: z.preprocess(emptyStringToUndefined, customerId.optional()),
});

export async function createProject(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    await createProjectQuery(parsedData);

    return {
      status: "success",
      message: t("project.create.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("project.create.error.internalServerError"),
    };
  }
}
