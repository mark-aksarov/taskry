import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { VerifyEmailPage } from "./VerifyEmailPage";
import { getSession } from "@/lib/data/utils/getSession";

export default async function AppVerifyEmailPage() {
  const session = await getSession();
  const locale = await getLocale();

  if (!session) {
    redirect({ href: "/sign-in", locale });
  }

  if (session?.user.emailVerified) {
    if (session.session.activeOrganizationId) {
      redirect({ href: "/dashboard", locale });
    }

    redirect({ href: "/create-organization", locale });
  }

  return <VerifyEmailPage email={session!.user.email} />;
}
