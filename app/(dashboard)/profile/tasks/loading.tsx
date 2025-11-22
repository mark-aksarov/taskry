import { ProfileNavigationMobile } from "@/components/users/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/users/ProfileNavigationDesktop";
import { UserTasksPageLoadingLayout } from "@/components/users/UserTasksPageLayout";

export default function AppProfileTasksPageLoading() {
  return (
    <UserTasksPageLoadingLayout
      navigationDesktop={<ProfileNavigationDesktop />}
      navigationMobile={<ProfileNavigationMobile />}
    />
  );
}
