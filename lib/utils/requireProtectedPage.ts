import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

export async function requireProtectedPage() {
  const locale = await getLocale();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect({ href: "/sign-in", locale });
  } else if (!session.user.emailVerified) {
    redirect({ href: "/verify-email", locale });
  }
}
