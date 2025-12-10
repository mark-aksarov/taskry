import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";

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

export function ProfileTasksPage({
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
      baseUrl="/profile/tasks"
      UserTasksContainer={UserTasksContainer}
      UserHeaderContainer={UserHeaderContainer}
      NewTaskFormContainer={NewTaskFormContainer}
      navigationDesktop={<ProfileNavigationDesktop />}
      navigationMobile={<ProfileNavigationMobile />}
    />
  );
}
