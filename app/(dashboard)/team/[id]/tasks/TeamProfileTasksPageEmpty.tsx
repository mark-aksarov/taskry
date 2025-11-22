import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";
import { UserTasksPageEmptyLayout } from "@/components/users/UserTasksPageLayout";

interface TeamProfileTasksPageEmptyProps {
  userId: string;
  UserHeaderContainer: React.ComponentType<{ userId: string }>;
}

export function TeamProfileTasksPageEmpty({
  userId,
  UserHeaderContainer,
}: TeamProfileTasksPageEmptyProps) {
  return (
    <UserTasksPageEmptyLayout
      userId={userId}
      UserHeaderContainer={UserHeaderContainer}
      navigationDesktop={<UserNavigationDesktop />}
      navigationMobile={<UserNavigationMobile />}
    />
  );
}
