import { UserTasksPageEmptyLayout } from "@/components/users/UserTasksPageLayout";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";

interface ProfileTasksPageEmptyProps {
  profileActions: React.ReactNode;
  newTaskFormContainer: React.ReactNode;
  userHeaderContainer: React.ReactNode;
}

export async function ProfileTasksPageEmpty({
  profileActions,
  newTaskFormContainer,
  userHeaderContainer,
}: ProfileTasksPageEmptyProps) {
  return (
    <UserTasksPageEmptyLayout
      newTaskFormContainer={newTaskFormContainer}
      userHeaderContainer={userHeaderContainer}
      navigationDesktop={
        <ProfileNavigationDesktop profileActions={profileActions} />
      }
      navigationMobile={<ProfileNavigationMobile />}
    />
  );
}
