"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { redirect } from "@/i18n/navigation";
import { userEmail } from "@/lib/schemas/user";
import { getLocale, getTranslations } from "next-intl/server";

const schema = z.object({
  email: userEmail,
});

export async function forgetPassword(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = await getLocale();
  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    await auth.api.requestPasswordReset({
      body: {
        email: parsedData.email,
        redirectTo: "/reset-password",
      },
    });
  } catch (error: unknown) {
    console.error("Password Reset Error:", error);

    //Better auth error
    if (error instanceof APIError) {
      return {
        status: "error",
        message: t("common.error.authError", { message: error.message }),
      };
    }

    return {
      status: "error",
      message: t("forgetPassword.error.internalServerError"),
    };
  }

  // Redirect to check email
  redirect({
    href: "/forget-password/check-email",
    locale,
  });

  return {
    status: "success",
  };
}
