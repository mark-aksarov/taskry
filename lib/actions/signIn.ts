"use server";

import * as z from "zod";
import { auth } from "../auth";
import { ActionState } from "./types";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

export async function signIn(
  callbackUrl: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = await getLocale();
  const t = await getTranslations("auth.SignInForm");

  // check if user is already signed in
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect({ href: "/", locale: await getLocale() });

    return {
      status: "success",
      message: null,
    };
  }

  // Validation
  const schema = z.object({
    email: z.email().min(1).max(254),
    password: z.string().min(1).min(8).max(128),
    rememberMe: z.preprocess((val) => !!val, z.boolean()),
  });

  const parse = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    rememberMe: formData.get("rememberMe"),
  });

  // Return errors if validation fails
  if (!parse.success) {
    return {
      status: "error",
      message: t("validation.server.invalidCredentials"),
    };
  }

  // Sign in
  const { email, password, rememberMe } = parse.data;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe,
      },
    });
  } catch (error: unknown) {
    // Better Auth Error
    if (
      error instanceof APIError &&
      (error.status === "BAD_REQUEST" ||
        error.status === "FORBIDDEN" ||
        error.status === "UNAUTHORIZED")
    ) {
      return {
        status: "error",
        message: t(`validation.server.${error.status.toLowerCase()}`),
      };
    }

    // Handle unexpected errors
    return {
      status: "error",
      message: t("validation.server.internalServerError"),
    };
  }

  // Handle redirect OUTSIDE the try/catch
  redirect({
    href: callbackUrl ?? "/",
    locale,
  });

  return {
    status: "success",
    message: null,
  };
}
