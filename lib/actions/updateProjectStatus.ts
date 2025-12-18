"use server";

import z from "zod";
import { auth } from "../auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { UpdateProjectStatusState } from "./types";
import { ProjectStatus } from "@/generated/prisma/enums";
import { updateProjectStatus as updateProjectStatusQuery } from "../dal/project";

const schema = z.object({
  id: z.coerce.number().int().positive(),
  nextStatus: z.enum(["active", "completed", "pending"]),
});

export async function updateProjectStatus(
  _prevState: UpdateProjectStatusState,
  {
    id,
    nextStatus,
  }: {
    id: number;
    nextStatus: string;
  },
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

    if (!session) {
      console.error("Unauthorized");
      return errorResponse;
    }

    // Validation
    const { success, error } = schema.safeParse({ id, nextStatus });
    if (!success) {
      console.error("Invalid data", error);
      return errorResponse;
    }

    // Update Status
    await updateProjectStatusQuery(id, nextStatus as ProjectStatus);

    revalidatePath("/projects");

    return { status: "success", message: null };
  } catch (error) {
    console.error("Update Project Status Error:", error);
    return errorResponse;
  }
}
