import { createAuthClient } from "better-auth/react";
const { useSession } = createAuthClient();

export function useHasGuestRole() {
  const { data: session, isPending, error } = useSession();

  if (error) {
    throw new Error();
  }

  return {
    isPending,
    // @ts-ignore
    isGuest: session?.user?.role === "guest",
  };
}
