"use server";

import z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { headers } from "next/headers";
import { userEmail } from "@/lib/schemas/user";
import { getTranslations } from "next-intl/server";
import { handleBetterAuthError } from "@/lib/utils/actionErrors";

const schema = z.object({
  email: userEmail,
});

export async function sendVerificationEmail(
  email: string,
): Promise<ActionState> {
  const t = await getTranslations("actions");

  // Validation
  const result = schema.safeParse({ email });

  if (!result.success) {
    return {
      status: "error",
      message: t("common.error.invalidData"),
    };
  }

  // Send verification email
  try {
    await auth.api.sendVerificationEmail({
      body: {
        email: result.data.email,
        callbackURL: "/dashboard",
      },
      headers: await headers(),
    });
  } catch (error: unknown) {
    return handleBetterAuthError(
      error,
      t("resetPassword.error.internalServerError"),
    );
  }

  return { status: "success" };
}
