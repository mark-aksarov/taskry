import {
  GlobalContainerProvider,
  GlobalContainerContextType,
} from "@/components/layout/GlobalContainerContext";

import { DashboardLayout } from "./DashboardLayout";
import { NotificationModalContentContainer } from "@/components/notifications/NotificationModalContentContainer";

const context: GlobalContainerContextType = {
  NotificationModalContentContainer,
};

export default async function AppDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalContainerProvider value={context}>
      <DashboardLayout>{children}</DashboardLayout>
    </GlobalContainerProvider>
  );
}
