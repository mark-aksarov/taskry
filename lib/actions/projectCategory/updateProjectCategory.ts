"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { projectCategorySchema } from "@/lib/schemas/projectCategory";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateProjectCategory as updateProjectCategoryQuery } from "@/lib/data/projectCategory/projectCategory.dal";

export async function updateProjectCategory(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const input = Object.fromEntries(formData.entries());
    const parsed = projectCategorySchema.safeParse(input);

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Create project
    await updateProjectCategoryQuery(parsed.data);
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
