import "server-only";

import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { getSession } from "../data/utils/getSession";

export async function requireFullAccess() {
  const session = await getSession();
  const locale = await getLocale();

  if (!session) {
    redirect({ href: "/sign-in", locale });
  }

  if (!session?.user.emailVerified) {
    redirect({ href: "/verify-email", locale });
  }

  if (!session?.session.activeOrganizationId) {
    redirect({ href: "/create-organization", locale });
  }

  return session!;
}
