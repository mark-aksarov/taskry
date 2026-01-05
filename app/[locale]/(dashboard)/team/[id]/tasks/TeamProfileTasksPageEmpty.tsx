import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";
import { UserTasksPageEmptyLayout } from "@/components/users/UserTasksPageLayout";

interface TeamProfileTasksPageEmptyProps {
  userId: string;
  NewTaskFormContainer: React.ComponentType;
  UserHeaderContainer: React.ComponentType<{ userId: string }>;
}

export function TeamProfileTasksPageEmpty({
  userId,
  NewTaskFormContainer,
  UserHeaderContainer,
}: TeamProfileTasksPageEmptyProps) {
  return (
    <UserTasksPageEmptyLayout
      userId={userId}
      NewTaskFormContainer={NewTaskFormContainer}
      UserHeaderContainer={UserHeaderContainer}
      navigationDesktop={<UserNavigationDesktop />}
      navigationMobile={<UserNavigationMobile />}
    />
  );
}
