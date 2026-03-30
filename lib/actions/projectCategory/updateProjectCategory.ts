"use server";

import {
  projectCategoryId,
  projectCategoryName,
} from "@/lib/schemas/projectCategory";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { NotFoundError } from "@/lib/data/utils/error";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateProjectCategory as updateProjectCategoryQuery } from "@/lib/data/projectCategory/projectCategory.dal";

const schema = z.object({
  id: projectCategoryId,
  name: projectCategoryName,
});

export async function updateProjectCategory(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    await updateProjectCategoryQuery(parsedData);

    return {
      status: "success",
      message: t("projectCategory.update.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    if (error instanceof NotFoundError) {
      return {
        status: "error",
        errorCode: "notFound",
        message: t("projectCategory.common.error.notFound"),
      };
    }

    return {
      status: "error",
      message: t("projectCategory.update.error.internalServerError"),
    };
  }
}
