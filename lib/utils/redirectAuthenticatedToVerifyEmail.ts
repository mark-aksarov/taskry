import "server-only";

import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { getSession } from "../data/utils/getSession";

export async function redirectAuthenticatedToVerifyEmail() {
  const session = await getSession();
  const locale = await getLocale();

  if (session && !session.user.emailVerified) {
    redirect({ href: "/verify-email", locale });
  }
}
