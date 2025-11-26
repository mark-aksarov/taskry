import { UserTasksPageLayout } from "@/components/users/UserTasksPageLayout";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";

interface TeamProfileTasksPageProps {
  userId: string;
  UserTasksContainer: React.ComponentType<{ userId: string }>;
  UserHeaderContainer: React.ComponentType<{ userId: string }>;
  NewTaskFormContainer: React.ComponentType;
}

export function TeamProfileTasksPage({
  userId,
  UserTasksContainer,
  UserHeaderContainer,
  NewTaskFormContainer,
}: TeamProfileTasksPageProps) {
  return (
    <UserTasksPageLayout
      userId={userId}
      UserTasksContainer={UserTasksContainer}
      UserHeaderContainer={UserHeaderContainer}
      NewTaskFormContainer={NewTaskFormContainer}
      navigationDesktop={<UserNavigationDesktop />}
      navigationMobile={<UserNavigationMobile />}
    />
  );
}
