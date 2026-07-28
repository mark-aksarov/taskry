import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { getSession } from "@/lib/data/utils/getSession";
import { CreateOrganizationPage } from "./CreateOrganizationPage";

export default async function AppCreateOrganizationPage() {
  const session = await getSession();
  const locale = await getLocale();

  if (!session) {
    redirect({ href: "/sign-in", locale });
  }

  if (!session?.user.emailVerified) {
    redirect({ href: "/verify-email", locale });
  }

  if (session?.session.activeOrganizationId) {
    redirect({ href: "/dashboard", locale });
  }

  return <CreateOrganizationPage />;
}
