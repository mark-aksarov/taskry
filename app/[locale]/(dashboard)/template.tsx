import DashboardTemplate from "./DashboardTemplate";
import { SearchModal } from "@/components/search/SearchModal";
import { UsersSearchContainer } from "@/components/search/UsersSearchContainer";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";
import { NotificationModalContentContainer } from "@/components/notifications/NotificationModalContentContainer";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";

interface DashboardTemplateProps {
  children: React.ReactNode;
}

export default async function AppDashboardTemplate({
  children,
}: DashboardTemplateProps) {
  const guestMode = await hasGuestRole();

  return (
    <DashboardTemplate
      notificationModalContentContainer={
        <NotificationModalContentContainer guestMode={guestMode} />
      }
      searchModal={
        <SearchModal
          usersSearchContainer={<UsersSearchContainer />}
          tasksSearchContainer={<TasksSearchContainer />}
          projectsSearchContainer={<ProjectsSearchContainer />}
        />
      }
    >
      {children}
    </DashboardTemplate>
  );
}
