import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SiteLayout } from "./SiteLayout";
import { signOut } from "@/lib/actions/auth/signOut";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";

export default async function AppSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isGuest = await hasGuestRole();

  return (
    <SiteLayout
      isGuest={isGuest}
      isEmailVerified={session ? session.user.emailVerified : false}
      signOut={signOut}
    >
      {children}
    </SiteLayout>
  );
}
