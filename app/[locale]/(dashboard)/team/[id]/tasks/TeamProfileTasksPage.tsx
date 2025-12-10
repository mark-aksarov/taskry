import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";

interface TeamProfileTasksPageProps {
  userId: string;
  page: number;
  pageSize: number;
  UserTasksContainer: React.ComponentType<{
    page: number;
    pageSize: number;
    userId: string;
    baseUrl: string;
  }>;
  UserHeaderContainer: React.ComponentType<{ userId: string }>;
  NewTaskFormContainer: React.ComponentType;
}

export function TeamProfileTasksPage({
  userId,
  page,
  pageSize,
  UserTasksContainer,
  UserHeaderContainer,
  NewTaskFormContainer,
}: TeamProfileTasksPageProps) {
  return (
    <UserTasksPageLayout
      userId={userId}
      page={page}
      pageSize={pageSize}
      baseUrl={`/team/${userId}/tasks`}
      UserTasksContainer={UserTasksContainer}
      UserHeaderContainer={UserHeaderContainer}
      NewTaskFormContainer={NewTaskFormContainer}
      navigationDesktop={<UserNavigationDesktop />}
      navigationMobile={<UserNavigationMobile />}
    />
  );
}
