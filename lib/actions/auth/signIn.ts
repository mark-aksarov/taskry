"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { rememberMe, userEmail, userPassword } from "@/lib/schemas/user";

const schema = z.object({
  email: userEmail,
  password: userPassword,
  rememberMe: rememberMe,
});

export async function signIn(
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

  let signedInUser;

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    const result = await auth.api.signInEmail({
      body: parsedData,
    });

    signedInUser = result.user;
  } catch (error: unknown) {
    console.error("Sign-in Error:", error);

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

  //we cannot call redirect in try/catch block
  if (signedInUser.emailVerified) {
    redirect({ href: "/dashboard", locale });
  }

  redirect({ href: "/verify-email", locale });

  return { status: "success" };
}
