import { ProfileActionsSkeleton } from "@/components/users/ProfileActions";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationLarge } from "@/components/users/UserNavigationLarge";
import { UserTasksPageLoadingLayout } from "@/components/users/UserTasksPageLayout";

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
