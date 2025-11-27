import { DashboardLayout } from "./DashboardLayout";
import { NotificationModalContentServerContainer } from "@/components/notifications/NotificationModalContentServerContainer";

export default async function AppDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardLayout
      NotificationModalContentContainer={
        NotificationModalContentServerContainer
      }
    >
      {children}
    </DashboardLayout>
  );
}
