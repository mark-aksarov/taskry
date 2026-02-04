"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { projectCategorySchema } from "@/lib/schemas/projectCategory";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { createProjectCategory as createProjectCategoryQuery } from "@/lib/data/projectCategory/projectCategory.dal";

export async function createProjectCategory(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const parsed = projectCategorySchema.safeParse({
      name: formData.get("name"),
    });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Create project
    await createProjectCategoryQuery(parsed.data);
    revalidatePath("/projects");

    return {
      status: "success",
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      errorCode: "internalServerError",
    };
  }
}
