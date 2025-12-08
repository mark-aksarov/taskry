"use server";

import * as z from "zod";
import { auth } from "../auth";
import { SignInState } from "./types";
import { APIError } from "better-auth";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

export async function signIn(
  callbackUrl: string,
  prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const schema = z.object({
    email: z.email().max(254),
    password: z.string().min(8).max(128),
    rememberMe: z.preprocess((val) => !!val, z.boolean()),
  });

  const parse = schema.safeParse({
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
    href: callbackUrl ?? "/",
    locale,
  });

  return {
    error: null,
    payload: formData,
  };
}
