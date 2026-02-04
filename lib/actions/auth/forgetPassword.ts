"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

const schema = z.object({
  email: z.email().min(1).max(254),
});

export async function forgetPassword(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = await getLocale();

  // Parse form data
  const input = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    return {
      status: "error",
      errorCode: "validationError",
    };
  }

  // Request password reset
  try {
    await auth.api.requestPasswordReset({
      body: {
        email: parsed.data.email,
        redirectTo: "/reset-password",
      },
    });
  } catch (error: unknown) {
    console.error("Password Reset Error:", error);

    //Better auth error
    if (error instanceof APIError) {
      return {
        status: "error",
        errorCode: "authServiceError",
        message: error.message,
      };
    }

    return {
      status: "error",
      errorCode: "internalServerError",
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
