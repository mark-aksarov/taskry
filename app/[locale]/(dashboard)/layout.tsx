import { DashboardLayout } from "./DashboardLayout";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
import { ModalManagerProvider } from "@/components/common/ModalManagerContext";

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
    isGuest: await hasGuestRole(),
    isOwner: await hasOwnerRole(),
    userId: session.user.id,
  };

  return (
    <ModalManagerProvider>
      <CurrentUserProvider value={currentUserContextValue}>
        <DashboardLayout>{children}</DashboardLayout>
      </CurrentUserProvider>

      <GuestModeModal />
    </ModalManagerProvider>
  );
}
