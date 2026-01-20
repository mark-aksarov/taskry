import { authClient } from "../auth-client";

export function useHasGuestMode() {
  const { data: session } = authClient.useSession();

  if (session) {
    return session.user.role === "guest";
  }

  return false;
}
