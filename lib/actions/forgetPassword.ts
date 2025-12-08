"use server";

import * as z from "zod";
import { auth } from "../auth";
import { APIError } from "better-auth";
import { ForgetPasswordState } from "./types";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

export async function forgetPassword(
  prevState: ForgetPasswordState,
  formData: FormData,
): Promise<ForgetPasswordState> {
  const schema = z.object({
    email: z.email().max(254),
  });

  const parse = schema.safeParse({
    email: formData.get("email"),
  });

  if (!parse.success) {
    return {
      error: {
        status: "InvalidInputData",
      },
      payload: formData,
    };
  }

  const { email } = parse.data;

  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: "/reset-password",
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
    href: "/forget-password/check-email",
    locale,
  });

  return {
    error: null,
    payload: formData,
  };
}
