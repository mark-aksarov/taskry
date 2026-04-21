import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { VerifyEmailPage } from "./VerifyEmailPage";

export default async function AppVerifyEmailPage() {
  const locale = await getLocale();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && session.user.emailVerified) {
    redirect({ href: "/dashboard", locale });
  } else if (!session) {
    redirect({ href: "/sign-in", locale });
  }

  return <VerifyEmailPage email={session!.user.email} />;
}
