"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { redirect } from "@/i18n/navigation";
import { userEmail, userPassword } from "@/lib/schemas/user";
import { getLocale, getTranslations } from "next-intl/server";

const schema = z.object({
  email: userEmail,
  password: userPassword,
});

export async function acceptInvite(
  token: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = await getLocale();
  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    // Request password reset
    await auth.api.resetPassword({
      body: {
        newPassword: parsedData.password,
        token,
      },
    });

    // Sign in
    await auth.api.signInEmail({
      body: {
        email: parsedData.email,
        password: parsedData.password,
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
      message: t("acceptInvite.error.internalServerError"),
    };
  }

  redirect({ href: "/dashboard", locale });

  return {
    status: "success",
  };
}
