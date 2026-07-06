import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SiteLayout } from "./SiteLayout";
import { signOut } from "@/lib/actions/auth/signOut";
import { CurrentUserProvider } from "@/common/CurrentUserContext";

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
    isGuest: session ? session.user.role === "guest" : false,
    isOwner: session ? session.user.role === "owner" : false,
    isEmailVerified: session ? session.user.emailVerified : false,
    userId: session ? session.user.id : null,
  };

  return (
    <CurrentUserProvider value={currentUserContextValue}>
      <SiteLayout signOut={signOut}>{children}</SiteLayout>
    </CurrentUserProvider>
  );
}
