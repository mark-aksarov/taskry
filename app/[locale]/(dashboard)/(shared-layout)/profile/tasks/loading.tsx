import { ProfileActionsSkeleton } from "@/components/users/ProfileActions";
import { UserTasksPageLoadingLayout } from "@/components/users/UserTasksPageLayout";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationLarge } from "@/components/users/ProfileNavigationLarge";

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
