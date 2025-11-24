import "../globals.css";

import { DashboardLayout } from "./DashboardLayout";
import { NotificationModalContentContainer } from "@/components/notifications/NotificationModalContent";

export default async function AppDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardLayout
      NotificationModalContentContainer={NotificationModalContentContainer}
    >
      {children}
    </DashboardLayout>
  );
}
