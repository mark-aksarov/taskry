import { UserNavigationMobile } from "@/components/users/UserNavigationMobile";
import { UserTasksPageLoadingLayout } from "@/components/users/UserTasksPageLayout";

export default function AppProfileTasksPageLoading() {
  return (
    <UserTasksPageLoadingLayout
      navigationDesktop={<>Skeleton</>}
      navigationMobile={<UserNavigationMobile />}
    />
  );
}
