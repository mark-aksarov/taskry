"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

const schema = z.object({
  name: z.string().min(5).max(50),
  email: z.email().min(1).max(254),
  password: z.string().min(8).max(128),
  rememberMe: z.coerce.boolean(),
});

export async function signUp(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = await getLocale();

  // Redirect if already signed in
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    redirect({ href: "/", locale });

    return {
      status: "success",
    };
  }

  const input = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    return {
      status: "error",
      errorCode: "validationError",
    };
  }

  const { name, email, password, rememberMe } = parsed.data;

  try {
    // Create workspace
    const workspace = await prisma.workspace.create({ data: {} });

    await auth.api.signUpEmail({
      body: { name, email, password, rememberMe, workspaceId: workspace.id },
    });
  } catch (error: unknown) {
    console.error("Sign-up Error:", error);

    //Better auth error
    if (error instanceof APIError) {
      return {
        status: "error",
        errorCode: "authServiceError",
        message: error.message,
      };
    }

    return {
      status: "error",
      errorCode: "internalServerError",
    };
  }

  //we cannot call redirect in try/catch block
  redirect({ href: "/verify-email", locale });

  return {
    status: "success",
  };
}
