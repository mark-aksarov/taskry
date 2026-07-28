"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { userPassword } from "@/lib/schemas/user";
import { getLocale, getTranslations } from "next-intl/server";
import { handleBetterAuthError } from "@/lib/utils/actionErrors";

const schema = z.object({
  password: userPassword,
});

export async function resetPassword(
  token: string,
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
    await auth.api.resetPassword({
      body: {
        newPassword: result.data.password,
        token,
      },
      headers: await headers(),
    });
  } catch (error: unknown) {
    return handleBetterAuthError(
      error,
      t("resetPassword.error.internalServerError"),
    );
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
