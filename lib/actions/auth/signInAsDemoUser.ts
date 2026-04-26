"use server";

import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

export async function signInAsDemoUser(): Promise<ActionState> {
  const t = await getTranslations("actions");
  const locale = await getLocale();

  try {
    await auth.api.signInEmail({
      body: {
        email: locale === "en" ? "bob.smith@corp.com" : "pavel@ws.com",
        password: "12345abc",
      },
    });
  } catch (error: unknown) {
    console.error("sign in as demo user Error:", error);

    if (error instanceof APIError) {
      return {
        status: "error",
        message: t("common.error.authError", { message: error.message }),
      };
    }

    return {
      status: "error",
      message: t("signIn.error.internalServerError"),
    };
  }

  redirect({ href: "/dashboard", locale });

  return { status: "success" };
}
