import ProfileTasksPageLoading from "./ProfileTasksPageLoading";
import { ProfileNavigationMobile } from "@/components/profile/ProfileNavigationMobile";
import { ProfileNavigationDesktop } from "@/components/profile/ProfileNavigationDesktop";

export default function AppProfileTasksPageLoading() {
  return (
    <ProfileTasksPageLoading
      profileNavigationDesktop={<ProfileNavigationDesktop />}
      profileNavigationMobile={<ProfileNavigationMobile />}
    />
  );
}
