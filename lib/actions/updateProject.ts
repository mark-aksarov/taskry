"use server";

import z from "zod";
import { auth } from "../auth";
import { ActionState } from "./types";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { updateProject as updateProjectQuery } from "../dal/project";

const schema = z.object({
  id: z.coerce.number().int().positive(),
  title: z.string().min(1).max(255),
  description: z.string().max(5000).optional(),
  deadline: z.coerce.date(),
  status: z.enum(["active", "completed", "pending"]),
  categoryId: z.coerce.number(),
  customerId: z.coerce.number().optional(),
});

export async function updateProject(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const t = await getTranslations("projects.ProjectFormBase");
  const locale = await getLocale();

  // Session Validation
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect({ href: "/sign-in", locale });

    console.error("Unauthorized");
    return {
      status: "error",
      message: null,
    };
  }

  // Data Validation
  const parse = schema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    deadline: formData.get("deadline"),
    status: formData.get("status"),
    categoryId: formData.get("categoryId"),
    customerId: formData.get("customerId"),
    workspaceId: formData.get("workspaceId"),
  });

  if (!parse.success) {
    console.error("Invalid form data", parse.error);

    return {
      status: "error",
      message: t("validation.server.invalidInput"),
    };
  }

  // Database Action
  try {
    const projectData = parse.data;

    await updateProjectQuery(projectData);

    revalidatePath("/projects");

    return {
      status: "success",
      message: null,
    };
  } catch (error) {
    console.error("Update Project Error:", error);

    return {
      status: "error",
      message: t("validation.server.internalServerError"),
    };
  }
}
