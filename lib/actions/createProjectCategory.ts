"use server";

import z from "zod";
import { auth } from "../auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { CreateProjectState } from "./types";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { createProjectCategory as createProjectCategoryQuery } from "../dal/project";

const schema = z.object({
  name: z.string().min(1).max(255),
});

export async function createProjectCategory(
  _prevState: CreateProjectState,
  formData: FormData,
): Promise<CreateProjectState> {
  const t = await getTranslations("actions.createProjectCategory");
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
    name: formData.get("name"),
  });

  if (!parse.success) {
    console.error("Invalid form data", parse.error);

    return {
      status: "error",
      message: t("invalidInput"),
    };
  }

  // Database Action
  try {
    const projectCategoryData = parse.data;

    await createProjectCategoryQuery(projectCategoryData);

    revalidatePath("/projects");

    return {
      status: "success",
      message: null,
    };
  } catch (error) {
    console.error("Create Project Error:", error);

    return {
      status: "error",
      message: t("internalServerError"),
    };
  }
}
