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
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { customerId } from "@/lib/schemas/customer";
import { emptyStringToNull } from "@/lib/schemas/base";
import { projectCategoryId } from "@/lib/schemas/projectCategory";
import { updateProject as updateProjectQuery } from "@/lib/data/project/project.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = z.object({
  id: projectId,
  title: projectTitle,
  description: z.preprocess(emptyStringToNull, projectDescription.nullable()),
  deadline: projectDeadline,
  status: projectStatus,
  categoryId: z.preprocess(emptyStringToNull, projectCategoryId.nullable()),
  customerId: z.preprocess(emptyStringToNull, customerId.nullable()),
});

export async function updateProject(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    await updateProjectQuery(parsedData);
    revalidatePath("/");

    return {
      status: "success",
      message: t("project.update.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("project.update.error"),
    };
  }
}
