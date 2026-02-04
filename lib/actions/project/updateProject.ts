"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { projectSchema } from "@/lib/schemas/project";
import { updateProject as updateProjectQuery } from "@/lib/data/project/project.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

export async function updateProject(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const input = Object.fromEntries(formData.entries());
    const parsed = projectSchema.safeParse(input);

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Update project
    await updateProjectQuery(parsed.data);
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
