"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { projectCategoryName } from "@/lib/schemas/projectCategory";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { createProjectCategory as createProjectCategoryQuery } from "@/lib/data/projectCategory/projectCategory.dal";

const schema = z.object({ name: projectCategoryName });

export async function createProjectCategory(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const t = await getTranslations("actions");

  try {
    const parsedData = schema.parse({
      name: formData.get("name"),
    });

    await createProjectCategoryQuery(parsedData);
    revalidatePath("/project-categories");

    return {
      status: "success",
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("createProjectCategory.error.internalServerError"),
    };
  }
}
