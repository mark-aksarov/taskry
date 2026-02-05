import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";
import { UserTasksPageEmptyLayout } from "@/components/users/UserTasksPageLayout";

interface TeamProfileTasksPageEmptyProps {
  userId: string;
  userActions?: React.ReactNode;
  newTaskFormContainer: React.ReactNode;
  userHeaderContainer: React.ReactNode;
}

export function TeamProfileTasksPageEmpty({
  userActions,
  newTaskFormContainer,
  userHeaderContainer,
}: TeamProfileTasksPageEmptyProps) {
  return (
    <UserTasksPageEmptyLayout
      newTaskFormContainer={newTaskFormContainer}
      userHeaderContainer={userHeaderContainer}
      navigationDesktop={<UserNavigationDesktop userActions={userActions} />}
      navigationMobile={<UserNavigationMobile />}
    />
  );
}
