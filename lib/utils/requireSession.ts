import "server-only";
import { getSession } from "../data/utils/getSession";

export async function requireSession() {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}
