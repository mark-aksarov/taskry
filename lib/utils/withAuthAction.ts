import { auth } from "../auth";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { ActionState } from "../actions/types";
import { getLocale, getTranslations } from "next-intl/server";

export async function withAuthAction(
  handler: () => Promise<ActionState>,
): Promise<ActionState> {
  const locale = await getLocale();
  const t = await getTranslations("actions.common");

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect({ href: "/sign-in", locale });
    return { status: "error", message: null };
  }

  try {
    return await handler();
  } catch (error) {
    console.error("Server Action Error:", error);
    return {
      status: "error",
      message: t("validation.internalServerError"),
    };
  }
}
