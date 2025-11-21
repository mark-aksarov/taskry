import { UserProfileNavigationMobile } from "@/components/users/UserProfileNavigationMobile";
import ProfileTasksPageLoading from "@/app/(dashboard)/profile/tasks/ProfileTasksPageLoading";
import { UserProfileNavigationDesktop } from "@/components/users/UserProfileNavigationDesktop";

export default function AppProfileTasksPageLoading() {
  return (
    <ProfileTasksPageLoading
      profileNavigationDesktop={<UserProfileNavigationDesktop />}
      profileNavigationMobile={<UserProfileNavigationMobile />}
    />
  );
}
