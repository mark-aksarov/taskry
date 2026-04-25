"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { redirect } from "@/i18n/navigation";
import { resetPasswordMode, userPassword } from "@/lib/schemas/user";
import { getLocale, getTranslations } from "next-intl/server";

const schema = z.object({
  mode: resetPasswordMode.catch(() => "reset" as const),
  password: userPassword,
});

export async function resetPassword(
  token: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = await getLocale();
  const t = await getTranslations("actions");

  let parsedData;
  try {
    const input = Object.fromEntries(formData.entries());
    parsedData = schema.parse(input);

    // Request password reset
    await auth.api.resetPassword({
      body: {
        newPassword: parsedData.password,
        token,
      },
    });
  } catch (error: unknown) {
    console.error("Reset Password Error:", error);

    //Better auth error
    if (error instanceof APIError) {
      return {
        status: "error",
        message: t("common.error.authError", { message: error.message }),
      };
    }

    return {
      status: "error",
      message: t("resetPassword.error.internalServerError"),
    };
  }

  // Redirect to sign-in with success query
  redirect({
    href: {
      pathname: "/sign-in",
      query: { mode: parsedData.mode },
    },
    locale,
  });

  return {
    status: "success",
  };
}
