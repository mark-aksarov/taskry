"use server";

import { auth } from "@/lib/auth";
import { ActionState } from "../types";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getSession } from "@/lib/data/utils/getSession";
import { getLocale, getTranslations } from "next-intl/server";
import { handleBetterAuthError } from "@/lib/utils/actionErrors";

export async function acceptInvitation(
  invitationId: string,
): Promise<ActionState> {
  const t = await getTranslations("actions");

  // Authorization
  const session = await getSession();

  if (!session) {
    return {
      status: "error",
      message: t("acceptInvite.error.notSignedIn"),
    };
  }

  const internalServerError = t("acceptInvite.error.internalServerError");

  // Validation. Check if user already belongs to another organization
  if (session.session.activeOrganizationId) {
    return {
      status: "error",
      message: t("acceptInvite.error.alreadyInOrganization"),
    };
  }

  // Accept invitation
  try {
    await auth.api.acceptInvitation({
      body: {
        invitationId,
      },
      headers: await headers(),
    });
  } catch (error: unknown) {
    return handleBetterAuthError(error, internalServerError);
  }

  // Success. Redirect to the dashboard
  const locale = await getLocale();
  redirect({ href: "/dashboard", locale });

  return {
    status: "success",
  };
}
