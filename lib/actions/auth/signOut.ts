"use server";

import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { handleBetterAuthError } from "@/lib/utils/actionErrors";

export async function signOut(): Promise<ActionState> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error: unknown) {
    const t = await getTranslations("actions");
    return handleBetterAuthError(error, t("common.error.internalServerError"));
  }

  return { status: "success" };
}
