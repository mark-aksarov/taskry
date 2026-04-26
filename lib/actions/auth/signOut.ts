"use server";

import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";

export async function signOut(): Promise<ActionState> {
  const t = await getTranslations("actions");

  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error: unknown) {
    console.error("Sign-out Error:", error);

    return {
      status: "error",
      message: t("common.error.internalServerError"),
    };
  }

  return { status: "success" };
}
