import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function hasGuestRole() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return session.user.role === "guest";
  }

  return false;
}
