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
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { updateProject as updateProjectQuery } from "@/lib/data/project/project.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { NotFoundError } from "@/lib/data/utils/error";

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

    return {
      status: "success",
      message: t("project.update.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    if (error instanceof NotFoundError) {
      if (error.code === "projectNotFound") {
        return {
          status: "error",
          errorCode: "notFound",
          message: t("project.common.error.notFound"),
        };
      } else {
        return {
          status: "error",
          errorCode: "badRequest",
          message: t("project.common.error.relationNotFound"),
        };
      }
    }

    return {
      status: "error",
      errorCode: "internalServerError",
      message: t("project.update.error.internalServerError"),
    };
  }
}
