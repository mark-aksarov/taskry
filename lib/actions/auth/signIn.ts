"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { userEmail, userPassword } from "@/lib/schemas/user";
import { getLocale, getTranslations } from "next-intl/server";

const schema = z.object({
  email: userEmail,
  password: userPassword,
  rememberMe: z.stringbool(),
});

export async function signIn(
  callbackUrl: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = await getLocale();
  const t = await getTranslations("actions");

  // Redirect if already signed in
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect({ href: "/", locale });

    return {
      status: "success",
    };
  }

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    await auth.api.signInEmail({ body: parsedData });
  } catch (error: unknown) {
    console.error("Sign-in Error:", error);

    //Better auth error
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
  redirect({ href: callbackUrl || "/", locale });

  return {
    status: "success",
  };
}
