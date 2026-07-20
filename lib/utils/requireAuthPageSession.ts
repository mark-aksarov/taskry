import { cache } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

export const requireAuthPageSession = cache(async () => {
  const locale = await getLocale();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect({
      href: session.user.emailVerified ? "/dashboard" : "/verify-email",
      locale,
    });
  }
});
