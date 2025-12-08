"use server";

import * as z from "zod";
import { auth } from "../auth";
import { APIError } from "better-auth";
import { ResetPasswordState } from "./types";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { buildURL } from "../utils/buildURL";

export async function resetPassword(
  token: string,
  prevState: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const schema = z.object({
    password: z.string().min(8).max(128),
  });

  const parse = schema.safeParse({
    password: formData.get("password"),
  });

  if (!parse.success) {
    return {
      error: {
        status: "InvalidInputData",
      },
    };
  }

  const { password } = parse.data;

  try {
    await auth.api.resetPassword({
      body: {
        newPassword: password,
        token,
      },
    });
  } catch (error: unknown) {
    if (error instanceof APIError) {
      return {
        error: {
          status: error.status,
          message: error.message,
        },
      };
    }

    return {
      error: {
        status: "UnknownError",
      },
    };
  }

  const locale = await getLocale();

  redirect({
    href: buildURL("/sign-in", { status: "reset-password-success" }),
    locale,
  });

  return {
    error: null,
  };
}
