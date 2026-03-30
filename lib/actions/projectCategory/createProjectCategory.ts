"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { projectCategoryName } from "@/lib/schemas/projectCategory";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { createProjectCategory as createProjectCategoryQuery } from "@/lib/data/projectCategory/projectCategory.dal";

const schema = z.object({ name: projectCategoryName });

export async function createProjectCategory(
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedData = schema.parse({
      name: formData.get("name"),
    });

    await createProjectCategoryQuery(parsedData);

    return {
      status: "success",
      message: t("projectCategory.create.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("projectCategory.create.error.internalServerError"),
    };
  }
}
