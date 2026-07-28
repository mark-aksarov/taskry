"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { userEmail } from "@/lib/schemas/user";
import { getLocale, getTranslations } from "next-intl/server";
import { handleBetterAuthError } from "@/lib/utils/actionErrors";

const schema = z.object({
  email: userEmail,
});

export async function forgetPassword(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = await getLocale();
  const t = await getTranslations("actions");

  // Validation
  const input = Object.fromEntries(formData.entries());
  const result = schema.safeParse(input);

  if (!result.success) {
    return {
      status: "error",
      message: t("common.error.invalidData"),
    };
  }

  // Request password reset
  try {
    await auth.api.requestPasswordReset({
      body: {
        email: result.data.email,
        redirectTo: "/reset-password",
      },
      headers: await headers(),
    });
  } catch (error: unknown) {
    return handleBetterAuthError(
      error,
      t("forgetPassword.error.internalServerError"),
    );
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
