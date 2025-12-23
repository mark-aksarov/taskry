"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { actionError, actionSuccess } from "../utils/actionResult";
import { validateActionInput } from "../utils/validateActionInput";

const schema = z.object({
  email: z.email().min(1).max(254),
  password: z.string().min(8).max(128),
  rememberMe: z.coerce.boolean(),
});

export async function signIn(
  callbackUrl: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = await getLocale();
  const t = await getTranslations("actions.signIn");

  // Check if user is already signed in
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect({ href: "/", locale });
    return actionSuccess();
  }

  // Parse form data
  const input = Object.fromEntries(formData.entries());
  const parsed = validateActionInput(schema, input);

  if (!parsed.success) {
    return actionError(t("validation.invalidInput"));
  }

  // Authenticate
  try {
    await auth.api.signInEmail({
      body: parsed.data,
    });
  } catch (error: unknown) {
    console.error("Sign-in Error:", error);

    if (error instanceof APIError) {
      const statusKey = String(error.status).toLowerCase();
      const knownKeys = ["bad_request", "forbidden", "unauthorized"];

      if (knownKeys.includes(statusKey)) {
        return actionError(t(`validation.${statusKey}`));
      }
    }

    return actionError(t("validation.internalServerError"));
  }

  // Redirect to callbackUrl or default "/"
  redirect({
    href: callbackUrl || "/",
    locale,
  });

  return actionSuccess();
}
