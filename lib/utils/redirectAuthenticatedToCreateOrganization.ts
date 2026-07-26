import "server-only";

import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { getSession } from "../data/utils/getSession";

export async function redirectAuthenticatedToCreateOrganization() {
  const session = await getSession();
  const locale = await getLocale();

  if (
    session &&
    session.user.emailVerified &&
    !session.session.activeOrganizationId
  ) {
    redirect({ href: "/create-organization", locale });
  }
}
