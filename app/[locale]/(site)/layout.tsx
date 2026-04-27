import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SiteLayout } from "./SiteLayout";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { CurrentUserProvider } from "@/dashboard/common/CurrentUserContext";

export default async function AppSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // This data is required to determine the user's role
  // and render the UI accordingly on the client side.
  const currentUserContextValue = {
    isGuest: await hasGuestRole(),
    isOwner: await hasOwnerRole(),
    userId: session ? session.user.id : null,
  };

  return (
    <CurrentUserProvider value={currentUserContextValue}>
      <SiteLayout>{children}</SiteLayout>
    </CurrentUserProvider>
  );
}
