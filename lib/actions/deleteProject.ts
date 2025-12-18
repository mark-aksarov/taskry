"use server";

import z from "zod";
import { auth } from "../auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { DeleteProjectState } from "./types";
import { getTranslations } from "next-intl/server";
import { deleteProject as deleteProjectQuery } from "../dal/project";

const schema = z.object({
  id: z.coerce.number().int().positive(),
});

export async function deleteProject(
  _prevState: DeleteProjectState,
  id: number,
): Promise<DeleteProjectState> {
  const t = await getTranslations("actions.deleteProjectAction");
  const errorResponse: DeleteProjectState = {
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
    const { success } = schema.safeParse({ id });
    if (!success) return errorResponse;

    // Delete Project
    await deleteProjectQuery(id);

    revalidatePath("/projects");
  } catch (error) {
    console.error("Delete Project Error:", error);
    return errorResponse;
  }

  return { status: "success", message: null };
}
