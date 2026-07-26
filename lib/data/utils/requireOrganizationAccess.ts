import { UnauthorizedError } from "./error";
import { getSession } from "./getSession";

export async function requireOrganizationAccess() {
  const session = await getSession();

  if (!session) {
    throw new UnauthorizedError();
  }

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
}
