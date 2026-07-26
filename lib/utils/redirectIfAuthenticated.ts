import "server-only";

import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { getSession } from "../data/utils/getSession";

export async function redirectIfAuthenticated() {
  const session = await getSession();

  if (!session) {
    return;
  }

  const locale = await getLocale();

  if (!session.user.emailVerified) {
    redirect({ href: "/verify-email", locale });
  }

  if (!session.session.activeOrganizationId) {
    redirect({ href: "/create-organization", locale });
  }

  redirect({ href: "/dashboard", locale });
}
