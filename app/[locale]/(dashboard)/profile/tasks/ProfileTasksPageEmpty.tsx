import { UserTasksPageEmptyLayout } from "@/components/users/UserTasksPageLayout";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";

interface ProfileTasksPageEmptyProps {
  userId: string;
  NewTaskFormContainer: React.ComponentType;
  UserHeaderContainer: React.ComponentType<{ userId: string }>;
}

export function ProfileTasksPageEmpty({
  userId,
  NewTaskFormContainer,
  UserHeaderContainer,
}: ProfileTasksPageEmptyProps) {
  return (
    <UserTasksPageEmptyLayout
      userId={userId}
      NewTaskFormContainer={NewTaskFormContainer}
      UserHeaderContainer={UserHeaderContainer}
      navigationDesktop={<ProfileNavigationDesktop />}
      navigationMobile={<ProfileNavigationMobile />}
    />
  );
}
