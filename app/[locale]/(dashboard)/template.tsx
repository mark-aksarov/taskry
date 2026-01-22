import { Suspense } from "react";
import DashboardTemplate from "./DashboardTemplate";
import { SearchModal } from "@/components/search/SearchModal";
import { UsersSearchContainer } from "@/components/search/UsersSearchContainer";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";
import { NotificationModalContentSkeleton } from "@/components/notifications/NotificationModalContent";
import { NotificationModalContentContainer } from "@/components/notifications/NotificationModalContentContainer";

interface DashboardTemplateProps {
  children: React.ReactNode;
}

export default async function AppDashboardTemplate({
  children,
}: DashboardTemplateProps) {
  return (
    <DashboardTemplate
      notificationModalContentContainer={
        <Suspense fallback={<NotificationModalContentSkeleton />}>
          <NotificationModalContentContainer />
        </Suspense>
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
