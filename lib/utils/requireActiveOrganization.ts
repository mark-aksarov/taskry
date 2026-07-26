import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const requireActiveOrganization = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session.activeOrganizationId) {
    throw new Error("Organization is required");
  }

  return {
    ...session,
    session: {
      ...session.session,
      activeOrganizationId: session.session.activeOrganizationId,
    },
  };
};
