"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { userEmail, userFullName, userPassword } from "@/lib/schemas/user";

const schema = z.object({
  name: userFullName,
  email: userEmail,
  password: userPassword,
  rememberMe: z.stringbool(),
});

export async function signUp(
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

    // Create workspace
    const workspace = await prisma.workspace.create({ data: {} });

    // Create user
    await auth.api.signUpEmail({
      body: { ...parsedData, workspaceId: workspace.id },
    });
  } catch (error: unknown) {
    console.error("Sign-up Error:", error);

    //Better auth error
    if (error instanceof APIError) {
      return {
        status: "error",
        message: t("common.error.authError", { message: error.message }),
      };
    }

    return {
      status: "error",
      message: t("signUp.error.internalServerError"),
    };
  }

  //we cannot call redirect in try/catch block
  redirect({ href: "/verify-email", locale });

  return {
    status: "success",
  };
}
