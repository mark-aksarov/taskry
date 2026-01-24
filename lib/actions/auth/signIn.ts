"use server";

import * as z from "zod";
import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { actionError, actionSuccess } from "../utils/actionResult";
import { validateActionInput } from "../utils/validateActionInput";

const schema = z.object({
  email: z.email().min(1).max(254),
  password: z.string().min(8).max(128),
  rememberMe: z.coerce.boolean(),
});

type KnownStatusKey = "bad_request" | "forbidden" | "unauthorized";

export async function signIn(
  callbackUrl: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = await getLocale();
  const t = await getTranslations("actions.signIn");

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

  try {
    await auth.api.signInEmail({ body: parsed.data });
  } catch (error: unknown) {
    console.error("Sign-in Error:", error);

    if (error instanceof APIError) {
      const statusKey = String(error.status).toLowerCase() as KnownStatusKey;

      if (statusKey === "bad_request") {
        return actionError(t("validation.bad_request"));
      }
      if (statusKey === "forbidden") {
        return actionError(t("validation.forbidden"));
      }
      if (statusKey === "unauthorized") {
        return actionError(t("validation.unauthorized"));
      }
    }

    return actionError(t("validation.internalServerError"));
  }

  redirect({ href: callbackUrl || "/", locale });
  return actionSuccess();
}
