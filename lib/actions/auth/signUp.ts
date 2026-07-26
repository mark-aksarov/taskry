"use server";

import {
  userEmail,
  rememberMe,
  userFullName,
  userPassword,
} from "@/lib/schemas/user";

import * as z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { handleBetterAuthError } from "@/lib/utils/actionErrors";

const schema = z.object({
  name: userFullName,
  email: userEmail,
  password: userPassword,
  rememberMe: rememberMe,
});

export async function signUp(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = await getLocale();
  const t = await getTranslations("actions");

  // Redirect if already signed in
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    redirect({ href: "/dashboard", locale });

    return {
      status: "success",
    };
  }

  // Validation
  const input = Object.fromEntries(formData.entries());
  const result = schema.safeParse(input);

  if (!result.success) {
    return {
      status: "error",
      message: t("common.error.invalidData"),
    };
  }

  // Sign up
  try {
    await auth.api.signUpEmail({
      body: {
        ...result.data,
        callbackURL: "/create-organization",
      },
      headers: await headers(),
    });
  } catch (error: unknown) {
    return handleBetterAuthError(error, t("signUp.error.internalServerError"));
  }

  // Success
  redirect({ href: "/verify-email", locale });

  return {
    status: "success",
  };
}
