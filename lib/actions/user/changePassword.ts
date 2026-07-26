"use server";

import z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { headers } from "next/headers";
import { userPassword } from "@/lib/schemas/user";
import { getTranslations } from "next-intl/server";
import { handleBetterAuthError } from "@/lib/utils/actionErrors";
import { verifyProtectedPageSession } from "@/lib/utils/verifyProtectedPageSession";

const schema = z.object({
  currentPassword: userPassword,
  newPassword: userPassword,
});

export async function changePassword(formData: FormData): Promise<ActionState> {
  // Authorization
  await verifyProtectedPageSession();

  const t = await getTranslations("actions");

  // Validation
  const input = Object.fromEntries(formData.entries());
  const result = schema.safeParse(input);

  if (!result.success) {
    return {
      status: "error",
      message: t("user.changePassword.error.invalidData"),
    };
  }

  const { currentPassword, newPassword } = result.data;

  // Change password
  try {
    await auth.api.changePassword({
      body: {
        currentPassword,
        newPassword,
      },
      headers: await headers(),
    });
  } catch (error: unknown) {
    return handleBetterAuthError(
      error,
      t("user.changePassword.error.internalServerError"),
    );
  }

  // Success
  return {
    status: "success",
    message: t("user.changePassword.success"),
  };
}
