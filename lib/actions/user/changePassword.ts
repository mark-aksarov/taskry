"use server";

import z from "zod";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { userPassword } from "@/lib/schemas/user";
import { getTranslations } from "next-intl/server";
import { requireActionSession } from "@/lib/utils/requireActionSession";
import { changePassword as changePasswordService } from "@/lib/data/user/user.service";

const schema = z.object({
  currentPassword: userPassword,
  newPassword: userPassword,
});

export async function changePassword(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireActionSession();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);
    await changePasswordService(parsedData);

    return {
      status: "success",
      message: t("user.changePassword.success"),
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
      message: t("user.changePassword.error.internalServerError"),
    };
  }
}
