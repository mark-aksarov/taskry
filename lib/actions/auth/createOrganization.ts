"use server";

import slugify from "slugify";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ActionState } from "../types";
import { redirect } from "@/i18n/navigation";
import { getSession } from "@/lib/data/utils/getSession";
import { getLocale, getTranslations } from "next-intl/server";
import { handleBetterAuthError } from "@/lib/utils/actionErrors";

export async function createOrganization(): Promise<ActionState> {
  const t = await getTranslations("actions");
  const internalServerError = t("createOrganization.error.internalServerError");

  //Authorization
  const session = await getSession();
  const locale = await getLocale();

  if (!session) {
    redirect({ href: "/sign-in", locale });
  }

  if (!session!.user.emailVerified) {
    redirect({ href: "/verify-email", locale });
  }

  // Validation. Check if user already belongs to another organization
  if (session?.session.activeOrganizationId) {
    return {
      status: "error",
      message: t("createOrganization.error.alreadyInOrganization"),
    };
  }

  // Create organization
  const orgName = `Organization ${session!.user.email}`;

  try {
    await auth.api.createOrganization({
      body: {
        name: orgName,
        slug: slugify(orgName),
      },
      headers: await headers(),
    });
  } catch (error: unknown) {
    return handleBetterAuthError(error, internalServerError);
  }

  // Success. Redirect to the dashboard
  redirect({ href: "/dashboard", locale });

  return {
    status: "success",
  };
}
