"use server";

import z from "zod";
import { auth } from "../auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "@/i18n/navigation";
import { deleteProject } from "../data/project";
import { getLocale, getTranslations } from "next-intl/server";
import { DeleteProjectActionState, DeleteProjectPayload } from "./types";

const schema = z.object({
  id: z.coerce.number().int().positive(),
});

export async function deleteProjectAction(
  _prevState: DeleteProjectActionState,
  { id, currentPage, isLastItemOnPage }: DeleteProjectPayload,
): Promise<DeleteProjectActionState> {
  const locale = await getLocale();
  const t = await getTranslations("actions.deleteProjectAction");
  const errorResponse: DeleteProjectActionState = {
    status: "error",
    message: t("error"),
  };
  let isSuccess = false;

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
    await deleteProject(111111);

    revalidatePath("/projects");
    isSuccess = true;
  } catch (error) {
    console.error("Delete Project Error:", error);
    return errorResponse;
  }

  // Handle redirect OUTSIDE the try/catch
  if (isSuccess && isLastItemOnPage && currentPage > 1) {
    redirect({ href: `/projects?page=${currentPage - 1}`, locale });
  }
  return { status: "success", message: null };
}
