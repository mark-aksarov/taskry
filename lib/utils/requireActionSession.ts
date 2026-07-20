import { cache } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export const requireActionSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    const locale = await getLocale();
    redirect({ href: "/sign-in", locale });
  }

  return session;
});
