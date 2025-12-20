"use server";

import z from "zod";
import { auth } from "../auth";
import { ActionState } from "./types";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { deleteProjects as deleteProjectQuery } from "../dal/project";

const schema = z.object({
  ids: z.array(z.coerce.number().int().positive()).min(1),
});

export async function deleteProjects(
  _prevState: ActionState,
  ids: number[],
): Promise<ActionState> {
  const t = await getTranslations("actions.deleteProjectAction");
  const errorResponse: ActionState = {
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
      console.error("Invalid project IDs", validated.error);
      return errorResponse;
    }

    // Execute delete
    await deleteProjectQuery(ids);

    revalidatePath("/projects");

    return {
      status: "success",
      message: null,
    };
  } catch (error) {
    console.error("Delete Project Error:", error);
    return errorResponse;
  }
}
