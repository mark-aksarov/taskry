import { UserTasksPageEmptyLayout } from "@/components/users/UserTasksPageLayout";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";

interface ProfileTasksPageEmptyProps {
  userId: string;
  newTaskFormContainer: React.ReactNode;
  userHeaderContainer: React.ReactNode;
}

export function ProfileTasksPageEmpty({
  newTaskFormContainer,
  userHeaderContainer,
}: ProfileTasksPageEmptyProps) {
  return (
    <UserTasksPageEmptyLayout
      newTaskFormContainer={newTaskFormContainer}
      userHeaderContainer={userHeaderContainer}
      navigationDesktop={<ProfileNavigationDesktop />}
      navigationMobile={<ProfileNavigationMobile />}
    />
  );
}
