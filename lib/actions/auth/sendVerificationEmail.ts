"use server";

import z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { headers } from "next/headers";
import { APIError } from "better-auth";
import { userEmail } from "@/lib/schemas/user";
import { getTranslations } from "next-intl/server";

const schema = z.object({
  email: userEmail,
});

export async function sendVerificationEmail(
  email: string,
): Promise<ActionState> {
  const t = await getTranslations("actions");

  try {
    const parsedData = schema.parse({ email });

    await auth.api.sendVerificationEmail({
      body: {
        email: parsedData.email,
      },
      headers: await headers(),
    });
  } catch (error: unknown) {
    console.error("SendVerificationEmail Error:", error);

    //Better auth error
    if (error instanceof APIError) {
      return {
        status: "error",
        message: t("common.error.authError", { message: error.message }),
      };
    }

    return {
      status: "error",
      message: t("common.error.internalServerError"),
    };
  }

  return { status: "success" };
}
