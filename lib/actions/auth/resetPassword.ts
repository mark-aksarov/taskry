"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

const schema = z.object({
  password: z.string().min(8).max(128),
});

export async function resetPassword(
  token: string,
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
    await auth.api.resetPassword({
      body: {
        newPassword: parsed.data.password,
        token,
      },
    });
  } catch (error: unknown) {
    console.error("Reset Password Error:", error);

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

  // Redirect to sign-in with success query
  redirect({
    href: {
      pathname: "/sign-in",
      query: { status: "reset-password-success" },
    },
    locale,
  });

  return {
    status: "success",
  };
}
