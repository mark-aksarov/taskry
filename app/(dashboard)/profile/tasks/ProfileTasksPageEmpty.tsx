import { UserTasksPageEmptyLayout } from "@/components/users/UserTasksPageLayout";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";

interface ProfileTasksPageEmptyProps {
  userId: string;
  UserHeaderContainer: React.ComponentType<{ userId: string }>;
}

export function ProfileTasksPageEmpty({
  userId,
  UserHeaderContainer,
}: ProfileTasksPageEmptyProps) {
  return (
    <UserTasksPageEmptyLayout
      userId={userId}
      UserHeaderContainer={UserHeaderContainer}
      navigationDesktop={<ProfileNavigationDesktop />}
      navigationMobile={<ProfileNavigationMobile />}
    />
  );
}
