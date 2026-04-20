import { ProfileActionsSkeleton } from "@/dashboard/users/ProfileActions";
import { UserNavigationMobile } from "@/dashboard/users/UserNavigationMobile";
import { UserNavigationLarge } from "@/dashboard/users/UserNavigationLarge";
import { UserTasksPageLoadingLayout } from "@/dashboard/users/UserTasksPageLayout";

export default function AppProfileTasksPageLoading() {
  return (
    <UserTasksPageLoadingLayout
      backButton
      navigationLarge={
        <UserNavigationLarge userActions={<ProfileActionsSkeleton />} />
      }
      navigationMobile={<UserNavigationMobile />}
    />
  );
}
