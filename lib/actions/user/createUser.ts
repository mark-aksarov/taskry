"use server";

import z from "zod";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { userEmail, userFullName, userPassword } from "@/lib/schemas/user";
import { createUser as createUserService } from "@/lib/data/user/user.service";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = z.object({
  email: userEmail,
  password: userPassword,
  fullName: userFullName,
});

export async function createUser(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);
    await createUserService(parsedData);
    revalidatePath("/team");

    return {
      status: "success",
      message: t("user.create.success"),
    };
  } catch (error: unknown) {
    console.error("Create User Error:", error);

    if (error instanceof APIError) {
      return {
        status: "error",
        message: t("common.error.authError", { message: error.message }),
      };
    }

    return {
      status: "error",
      message: t("user.create.error"),
    };
  }
}
