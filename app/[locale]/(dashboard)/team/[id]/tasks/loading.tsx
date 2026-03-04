import { ProfileActionsSkeleton } from "@/components/users/ProfileActions";
import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserNavigationDesktop } from "@/components/users/UserNavigationDesktop";
import { UserTasksPageLoadingLayout } from "@/components/users/UserTasksPageLayout";

export default function AppProfileTasksPageLoading() {
  return (
    <UserTasksPageLoadingLayout
      navigationDesktop={
        <UserNavigationDesktop userActions={<ProfileActionsSkeleton />} />
      }
      navigationMobile={<UserNavigationMobile />}
    />
  );
}
