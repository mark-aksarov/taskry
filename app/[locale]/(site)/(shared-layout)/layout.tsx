import { SiteLayout } from "./SiteLayout";
import { signOut } from "@/lib/actions/auth/signOut";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";

export default async function AppSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isGuest = await hasGuestRole();

  return (
    <SiteLayout isGuest={isGuest} signOut={signOut}>
      {children}
    </SiteLayout>
  );
}
