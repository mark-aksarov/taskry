import {
  GlobalContainerProvider,
  GlobalContainerContextType,
} from "@/components/layout/GlobalContainerContext";

import { DashboardLayout } from "./DashboardLayout";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { UsersSearchContainer } from "@/components/search/UsersSearchContainer";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";
import { NotificationModalContentContainer } from "@/components/notifications/NotificationModalContentContainer";

const context: GlobalContainerContextType = {
  NotificationModalContentContainer,
  UsersSearchContainer,
  TasksSearchContainer,
  ProjectsSearchContainer,
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
