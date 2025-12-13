"use server";

import * as z from "zod";
import { auth } from "../auth";
import prisma from "../prisma";
import { SignUpState } from "./types";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export async function signUp(
  prevState: SignUpState,
  formData: FormData,
): Promise<SignUpState> {
  // check if user is already signed in
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect({ href: "/", locale: await getLocale() });

    return {
      error: null,
      payload: formData,
    };
  }

  // validate input
  const schema = z.object({
    name: z.string().min(5).max(50),
    email: z.email().max(254),
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
      error: {
        status: "InvalidInputData",
      },
      payload: formData,
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
    console.error("[signUp] Error:", error);
    if (error instanceof APIError) {
      return {
        error: {
          status: error.status,
          message: error.message,
        },
        payload: formData,
      };
    }

    return {
      error: {
        status: "UnknownError",
      },
      payload: formData,
    };
  }

  const locale = await getLocale();

  redirect({
    href: "/verify-email",
    locale,
  });

  return {
    error: null,
    payload: formData,
  };
}
