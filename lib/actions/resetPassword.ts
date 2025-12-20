"use server";

import * as z from "zod";
import { auth } from "../auth";
import { APIError } from "better-auth";
import { ResetPasswordState } from "./types";
import { redirect } from "@/i18n/navigation";
import { buildURL } from "../utils/buildURL";
import { getLocale, getTranslations } from "next-intl/server";

export async function resetPassword(
  token: string,
  prevState: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const locale = await getLocale();
  const t = await getTranslations("auth.ForgetPasswordForm");

  // Validation
  const schema = z.object({
    password: z.string().min(8).max(128),
  });

  const parse = schema.safeParse({
    password: formData.get("password"),
  });

  // Return errors if validation fails
  if (!parse.success) {
    return {
      status: "error",
      message: t("validation.server.invalidCredentials"),
    };
  }

  // Request password reset
  const { password } = parse.data;

  try {
    await auth.api.resetPassword({
      body: {
        newPassword: password,
        token,
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
    href: buildURL("/sign-in", { status: "reset-password-success" }),
    locale,
  });

  return {
    status: "success",
    message: null,
  };
}
