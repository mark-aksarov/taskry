import { ProfileActionsSkeleton } from "@/components/users/ProfileActions";
import { UserTasksPageLoadingLayout } from "@/components/users/UserTasksPageLayout";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";

export default async function AppProfileTasksPageLoading() {
  return (
    <UserTasksPageLoadingLayout
      navigationDesktop={
        <ProfileNavigationDesktop profileActions={<ProfileActionsSkeleton />} />
      }
      navigationMobile={<ProfileNavigationMobile />}
    />
  );
}
