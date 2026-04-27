import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CtaSection } from "./CtaSection";
import { signOut } from "@/lib/actions/auth/signOut";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";

export async function CtaActionsContainer() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isGuest = await hasGuestRole();

  return (
    <CtaSection
      isGuest={isGuest}
      signOut={signOut}
      hasSession={session !== null}
    />
  );
}
