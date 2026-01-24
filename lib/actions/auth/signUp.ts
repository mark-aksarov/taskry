"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { actionError, actionSuccess } from "../utils/actionResult";
import { validateActionInput } from "../utils/validateActionInput";

const schema = z.object({
  name: z.string().min(5).max(50),
  email: z.email().min(1).max(254),
  password: z.string().min(8).max(128),
  rememberMe: z.coerce.boolean(),
});

type KnownStatusKey = "bad_request" | "unprocessable_entity";

export async function signUp(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = await getLocale();
  const t = await getTranslations("actions.signUp");

  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    redirect({ href: "/", locale });
    return actionSuccess();
  }

  const input = Object.fromEntries(formData.entries());
  const parsed = validateActionInput(schema, input);
  if (!parsed.success) {
    return actionError(t("validation.invalidInput"));
  }

  const { name, email, password, rememberMe } = parsed.data;

  try {
    const workspace = await prisma.workspace.create({ data: {} });

    await auth.api.signUpEmail({
      body: { name, email, password, rememberMe, workspaceId: workspace.id },
    });
  } catch (error: unknown) {
    console.error("Sign-up Error:", error);

    if (error instanceof APIError) {
      const statusKey = String(error.status).toLowerCase() as KnownStatusKey;

      if (statusKey === "bad_request") {
        return actionError(t("validation.bad_request"));
      }
      if (statusKey === "unprocessable_entity") {
        return actionError(t("validation.unprocessable_entity"));
      }
    }

    return actionError(t("validation.internalServerError"));
  }

  redirect({ href: "/verify-email", locale });
  return actionSuccess();
}
