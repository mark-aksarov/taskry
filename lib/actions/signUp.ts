"use server";

import * as z from "zod";
import { auth } from "../auth";
import prisma from "../prisma";
import { SignUpState } from "./types";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

export async function signUp(
  _prevState: SignUpState,
  formData: FormData,
): Promise<SignUpState> {
  const locale = await getLocale();
  const t = await getTranslations("auth.SignUpForm");

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
    name: z.string().min(5).max(50),
    email: z.email().min(1).max(254),
    password: z.string().min(8).max(128),
    rememberMe: z.preprocess((val) => !!val, z.boolean()),
  });

  const parse = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    rememberMe: formData.get("rememberMe"),
  });

  if (!parse.success) {
    return {
      status: "error",
      message: t("validation.server.invalidInputData"),
    };
  }

  const { name, email, password, rememberMe } = parse.data;

  try {
    // create workspace
    const workspace = await prisma.workspace.create({
      data: { id: 3 },
    });

    // create user
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        rememberMe,
        workspaceId: workspace.id,
      },
    });
  } catch (error: unknown) {
    // Better Auth Error
    if (
      error instanceof APIError &&
      (error.status === "BAD_REQUEST" ||
        error.status === "UNPROCESSABLE_ENTITY")
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
    href: "/verify-email",
    locale,
  });

  return {
    status: "success",
    message: null,
  };
}
