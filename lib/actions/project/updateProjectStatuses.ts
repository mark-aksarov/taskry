"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { coercedPositiveInt } from "@/lib/schemas/base";
import { ProjectStatus } from "@/generated/prisma/enums";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { updateProjectStatuses as updateProjectStatusesQuery } from "@/lib/data/project/project.dal";

const schema = z.object({
  ids: z.array(coercedPositiveInt).min(1),
  nextStatus: z.enum(ProjectStatus),
});

export async function updateProjectStatuses(
  _prevState: ActionState,
  { ids, nextStatus }: { ids: number[]; nextStatus: ProjectStatus },
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const parsed = schema.safeParse({ ids, nextStatus });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Execute update
    await updateProjectStatusesQuery(parsed.data.ids, parsed.data.nextStatus);

    // Revalidation
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
