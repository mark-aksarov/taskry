"use server";

import z from "zod";
import { auth } from "../auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { UpdateProjectStatusState, UpdateProjectStatusPayload } from "./types";
import { updateProjectStatus as updateProjectStatusQuery } from "../data/project";

const schema = z.object({
  id: z.coerce.number().int().positive(),
  statusId: z.enum(["active", "completed", "pending"]),
});

export async function updateProjectStatus(
  _prevState: UpdateProjectStatusState,
  { id, statusId }: UpdateProjectStatusPayload,
): Promise<UpdateProjectStatusState> {
  const t = await getTranslations("actions.updateProjectStatus");
  const errorResponse: UpdateProjectStatusState = {
    status: "error",
    message: t("error"),
  };

  try {
    // Authorization
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) return errorResponse;

    // Validation
    const { success } = schema.safeParse({ id, statusId });
    if (!success) return errorResponse;

    // Update Status
    await updateProjectStatusQuery(id, statusId);

    revalidatePath("/projects");

    return { status: "success", message: null };
  } catch (error) {
    console.error("Update Project Status Error:", error);
    return errorResponse;
  }
}
