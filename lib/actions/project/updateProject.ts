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
import { customerId } from "@/lib/schemas/customer";
import { emptyStringToNull } from "@/lib/schemas/base";
import { projectCategoryId } from "@/lib/schemas/projectCategory";
import { updateProject as updateProjectQuery } from "@/lib/data/project/project.dal";
import { requireActionSession } from "@/lib/utils/requireActionSession";

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
  customerId: z.preprocess(emptyStringToNull, customerId.nullable()).optional(),
});

export async function updateProject(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    await updateProjectQuery(parsedData);

    return {
      status: "success",
      message: t("project.update.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("project.update.error.internalServerError"),
    };
  }
}
