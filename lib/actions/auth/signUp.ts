"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { actionError, actionSuccess } from "../utils/actionResult";
import { validateActionInput } from "../utils/validateActionInput";

const schema = z.object({
  name: z.string().min(5).max(50),
  email: z.email().min(1).max(254),
  password: z.string().min(8).max(128),
  rememberMe: z.coerce.boolean(),
});

export async function signUp(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = await getLocale();
  const t = await getTranslations("actions.signUp");

  // Check if user is already signed in
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect({ href: "/", locale });
    return actionSuccess();
  }

  // Parse and validate form data
  const input = Object.fromEntries(formData.entries());
  const parsed = validateActionInput(schema, input);

  if (!parsed.success) {
    return actionError(t("validation.invalidInput"));
  }

  const { name, email, password, rememberMe } = parsed.data;

  try {
    // Create workspace
    const workspace = await prisma.workspace.create({
      data: { id: 3 }, // Adjust as needed
    });

    // Sign-up
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        rememberMe,
        workspaceId: workspace.id,
      },
    });
  } catch (error: unknown) {
    console.error("Sign-up Error:", error);

    if (error instanceof APIError) {
      const statusKey = String(error.status).toLowerCase();
      const knownKeys = ["bad_request", "unprocessable_entity"];

      if (knownKeys.includes(statusKey)) {
        return actionError(t(`validation.${statusKey}`));
      }
    }

    return actionError(t("validation.internalServerError"));
  }

  // Redirect to verify email
  redirect({
    href: "/verify-email",
    locale,
  });

  return actionSuccess();
}
