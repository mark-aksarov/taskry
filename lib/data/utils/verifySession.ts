import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UnauthorizedError } from "./error";

export async function verifySession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new UnauthorizedError();
  return session;
}
