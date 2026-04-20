import { ProfileActionsSkeleton } from "@/dashboard/users/ProfileActions";
import { UserTasksPageLoadingLayout } from "@/dashboard/users/UserTasksPageLayout";
import { ProfileNavigationMobile } from "@/dashboard/users/ProfileNavigationMobile";
import { ProfileNavigationLarge } from "@/dashboard/users/ProfileNavigationLarge";

export default async function AppProfileTasksPageLoading() {
  return (
    <UserTasksPageLoadingLayout
      navigationLarge={
        <ProfileNavigationLarge profileActions={<ProfileActionsSkeleton />} />
      }
      navigationMobile={<ProfileNavigationMobile />}
    />
  );
}
