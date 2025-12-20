"use server";

import * as z from "zod";
import { auth } from "../auth";
import { ActionState } from "./types";
import { APIError } from "better-auth";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

export async function forgetPassword(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = await getLocale();
  const t = await getTranslations("auth.ForgetPasswordForm");

  // Validation
  const schema = z.object({
    email: z.email().min(1).max(254),
  });

  const parse = schema.safeParse({
    email: formData.get("email"),
  });

  // Return errors if validation fails
  if (!parse.success) {
    return {
      status: "error",
      message: t("validation.server.invalidCredentials"),
    };
  }

  // Request password reset
  const { email } = parse.data;

  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: "/reset-password",
      },
    });
  } catch (error: unknown) {
    if (error instanceof APIError && error.status === "BAD_REQUEST") {
      return {
        status: "error",
        message: t(`validation.server.${error.status.toLowerCase()}`),
      };
    }

    return {
      status: "error",
      message: t("validation.server.internalServerError"),
    };
  }

  // Handle redirect OUTSIDE the try/catch
  redirect({
    href: "/forget-password/check-email",
    locale,
  });

  return {
    status: "success",
    message: null,
  };
}
