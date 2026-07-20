"use server";

import z from "zod";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { getTranslations } from "next-intl/server";
import { userId, userPassword } from "@/lib/schemas/user";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { resetPassword as resetPasswordService } from "@/lib/data/user/user.service";

const schema = z.object({
  id: userId,
  newPassword: userPassword,
});

export async function resetPassword(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);
    await resetPasswordService(parsedData);

    return {
      status: "success",
      message: t("user.resetPassword.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    if (error instanceof APIError) {
      return {
        status: "error",
        message: t("common.error.authError", { message: error.message }),
      };
    }

    return {
      status: "error",
      message: t("user.resetPassword.error.internalServerError"),
    };
  }
}
