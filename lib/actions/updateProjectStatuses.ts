"use server";

import z from "zod";
import { auth } from "../auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { UpdateProjectStatusesState } from "./types";
import { ProjectStatus } from "@/generated/prisma/enums";
import {
  updateProjectStatus as updateProjectStatusQuery,
  bulkUpdateProjectStatuses as bulkUpdateProjectStatusesQuery,
} from "../dal/project";

const schema = z.object({
  ids: z.array(z.coerce.number().int().positive()).min(1),
  nextStatus: z.enum(["active", "completed", "pending"]),
});

export async function updateProjectStatuses(
  _prevState: UpdateProjectStatusesState,
  {
    ids,
    nextStatus,
  }: {
    ids: number[];
    nextStatus: string;
  },
): Promise<UpdateProjectStatusesState> {
  const t = await getTranslations("actions.updateProjectStatus");
  const errorResponse: UpdateProjectStatusesState = {
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
    const { success, error } = schema.safeParse({ ids, nextStatus });
    if (!success) {
      console.error("Invalid data", error);
      return errorResponse;
    }

    // Update Status
    if (ids.length === 1) {
      await updateProjectStatusQuery(ids[0], nextStatus as ProjectStatus);
    } else {
      await bulkUpdateProjectStatusesQuery(ids, nextStatus as ProjectStatus);
    }

    revalidatePath("/projects");

    return { status: "success", message: null };
  } catch (error) {
    console.error("Update Project Status Error:", error);
    return errorResponse;
  }
}
