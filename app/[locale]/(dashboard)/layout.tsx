import {
  GlobalContainerProvider,
  GlobalContainerContextType,
} from "@/components/layout/GlobalContainerContext";

import { DashboardLayout } from "./DashboardLayout";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { NotificationModalContentContainer } from "@/components/notifications/NotificationModalContentContainer";

const context: GlobalContainerContextType = {
  NotificationModalContentContainer,
};

export default async function AppDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const guestMode = await hasGuestRole();

  return (
    <GlobalContainerProvider value={context}>
      <DashboardLayout guestMode={guestMode}>{children}</DashboardLayout>
    </GlobalContainerProvider>
  );
}
