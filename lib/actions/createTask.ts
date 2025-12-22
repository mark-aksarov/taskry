"use server";

import z from "zod";
import { auth } from "../auth";
import { ActionState } from "./types";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "@/i18n/navigation";
import { TaskStatus } from "@/generated/prisma/enums";
import { createTask as createTaskQuery } from "../dal/task";
import { getLocale, getTranslations } from "next-intl/server";

const schema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(5000).optional(),
  deadline: z.coerce.date(),
  status: z.enum(TaskStatus),
  categoryId: z.coerce.number(),
  projectId: z.coerce.number(),
  assigneeId: z.coerce.string().optional(),
});

export async function createTask(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const t = await getTranslations("action.createTask");
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
    title: formData.get("title"),
    description: formData.get("description"),
    deadline: formData.get("deadline"),
    status: formData.get("status"),
    categoryId: formData.get("categoryId"),
    projectId: formData.get("projectId"),
    assigneeId: formData.get("assigneeId"),
    workspaceId: formData.get("workspaceId"),
  });

  if (!parse.success) {
    console.error("Invalid form data", parse.error);

    return {
      status: "error",
      message: t("validation.invalidInput"),
    };
  }

  // Database Action
  try {
    const projectData = parse.data;

    await createTaskQuery(projectData);

    revalidatePath("/projects");

    return {
      status: "success",
      message: null,
    };
  } catch (error) {
    console.error("Create Project Error:", error);

    return {
      status: "error",
      message: t("validation.internalServerError"),
    };
  }
}
