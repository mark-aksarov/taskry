import "server-only";
import { getSession } from "../data/utils/getSession";
import { UnauthorizedError } from "../data/utils/error";

export async function requireSession() {
  const session = await getSession();

  if (!session) {
    throw new UnauthorizedError();
  }

  return session;
}
