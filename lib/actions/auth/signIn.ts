"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { rememberMe, userEmail } from "@/lib/schemas/user";
import { getLocale, getTranslations } from "next-intl/server";
import { handleBetterAuthError } from "@/lib/utils/actionErrors";

const schema = z.object({
  email: userEmail,
  password: z.string(),
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

  // Validation
  const input = Object.fromEntries(formData.entries());
  const result = schema.safeParse(input);

  if (!result.success) {
    return {
      status: "error",
      message: t("signIn.error.invalidData"),
    };
  }

  // Sign in
  let signInHeaders: Headers | null = null;

  try {
    ({ headers: signInHeaders } = await auth.api.signInEmail({
      returnHeaders: true,
      body: result.data,
      headers: await headers(),
    }));
  } catch (error: unknown) {
    return await handleBetterAuthError(
      error,
      t("signIn.error.internalServerError"),
    );
  }

  // Read the session created during sign-in using the returned cookie,
  // then redirect the user based on their account state.
  const setCookie = signInHeaders!.get("set-cookie");

  if (!setCookie) {
    return {
      status: "error",
      message: t("signIn.error.internalServerError"),
    };
  }

  const sessionAfterSignIn = await auth.api.getSession({
    headers: { cookie: setCookie },
  });

  if (!sessionAfterSignIn) {
    return {
      status: "error",
      message: t("signIn.error.internalServerError"),
    };
  }

  const emailVerified = sessionAfterSignIn.user.emailVerified;
  const activeOrganizationId = sessionAfterSignIn.session.activeOrganizationId;

  if (!emailVerified) {
    redirect({ href: "/verify-email", locale });
  }

  if (!activeOrganizationId) {
    redirect({ href: "/create-organization", locale });
  }

  redirect({ href: "/dashboard", locale });

  return {
    status: "success",
  };
}
