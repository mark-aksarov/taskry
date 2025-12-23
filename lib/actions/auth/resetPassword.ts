"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { redirect } from "@/i18n/navigation";
import { buildURL } from "../../utils/buildURL";
import { getLocale, getTranslations } from "next-intl/server";
import { actionError, actionSuccess } from "../utils/actionResult";
import { validateActionInput } from "../utils/validateActionInput";

const schema = z.object({
  password: z.string().min(8).max(128),
});

export async function resetPassword(
  token: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = await getLocale();
  const t = await getTranslations("actions.resetPassword");

  // Parse form data
  const input = Object.fromEntries(formData.entries());
  const parsed = validateActionInput(schema, input);

  if (!parsed.success) {
    return actionError(t("validation.invalidInput"));
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

    if (error instanceof APIError && error.status === "BAD_REQUEST") {
      return actionError(t(`validation.${error.status.toLowerCase()}`));
    }

    return actionError(t("validation.internalServerError"));
  }

  // Redirect to sign-in with success query
  redirect({
    href: buildURL("/sign-in", { status: "reset-password-success" }),
    locale,
  });

  return actionSuccess();
}
