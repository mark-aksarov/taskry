import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";
import { UserTasksPageEmptyLayout } from "@/components/users/UserTasksPageLayout";

interface TeamProfileTasksPageEmptyProps {
  userId: string;
  newTaskFormContainer: React.ReactNode;
  userHeaderContainer: React.ReactNode;
}

export function TeamProfileTasksPageEmpty({
  newTaskFormContainer,
  userHeaderContainer,
}: TeamProfileTasksPageEmptyProps) {
  return (
    <UserTasksPageEmptyLayout
      newTaskFormContainer={newTaskFormContainer}
      userHeaderContainer={userHeaderContainer}
      navigationDesktop={<UserNavigationDesktop />}
      navigationMobile={<UserNavigationMobile />}
    />
  );
}
