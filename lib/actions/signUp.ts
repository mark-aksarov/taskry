"use server";

import * as z from "zod";
import { auth } from "../auth";
import { SignUpState } from "./types";
import { APIError } from "better-auth";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export async function signUp(
  prevState: SignUpState,
  formData: FormData,
): Promise<SignUpState> {
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
    await auth.api.signUpEmail({
      body: {
        name,
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
    href: "/verify-email",
    locale,
  });

  return {
    error: null,
    payload: formData,
  };
}
