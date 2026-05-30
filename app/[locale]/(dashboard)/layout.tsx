import { DashboardLayout } from "./DashboardLayout";
import { signOut } from "@/lib/actions/auth/signOut";
import { CurrentUserProvider } from "@/common/CurrentUserContext";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";

export default async function AppDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Authorization
  const session = await requireProtectedPage();

  // This data is required to determine the user's role
  // and render the UI accordingly on the client side.
  const currentUserContextValue = {
    isGuest: session.user.role === "guest",
    isOwner: session.user.role === "owner",
    isEmailVerified: session.user.emailVerified,
    userId: session.user.id,
  };

  return (
    <CurrentUserProvider value={currentUserContextValue}>
      <DashboardLayout signOut={signOut}>{children}</DashboardLayout>
    </CurrentUserProvider>
  );
}
