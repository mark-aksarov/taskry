import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ActionState } from "../types";
import { redirect } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

export async function withAuthAction(
  handler: () => Promise<ActionState>,
): Promise<ActionState> {
  const t = await getTranslations("actions.common");

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
