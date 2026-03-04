import { UserTasksPageLoadingLayout } from "@/components/users/UserTasksPageLayout";
import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";

export default async function AppProfileTasksPageLoading() {
  return (
    <UserTasksPageLoadingLayout
      navigationDesktop={<>Skeleton</>}
      navigationMobile={<ProfileNavigationMobile />}
    />
  );
}
