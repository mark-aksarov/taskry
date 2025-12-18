"use server";

import z from "zod";
import { auth } from "../auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { DeleteProjectState } from "./types";
import { getTranslations } from "next-intl/server";
import { deleteProject as deleteProjectQuery } from "../dal/project";

const schema = z.object({
  ids: z.union([
    z.coerce.number().int().positive(),
    z.array(z.coerce.number().int().positive()),
  ]),
});

export async function deleteProject(
  _prevState: DeleteProjectState,
  ids: number | number[],
): Promise<DeleteProjectState> {
  const t = await getTranslations("actions.deleteProjectAction");
  const errorResponse: DeleteProjectState = {
    status: "error",
    message: t("error"),
  };

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      console.error("Unauthorized");
      return errorResponse;
    }

    // Validation
    const validated = schema.safeParse({ ids });
    if (!validated.success) {
      console.error("Invalid project ID", validated.error);
      return errorResponse;
    }

    // Execute delete
    await deleteProjectQuery(ids);

    revalidatePath("/projects");

    return { status: "success", message: t("success") };
  } catch (error) {
    console.error("Delete Project Error:", error);
    return errorResponse;
  }
}
