import { ProfileTasksPage } from "./ProfileTasksPage";
import { ProfileHeaderContainer } from "@/components/profile/ProfileHeader";
import { ProfileTasksDesktopContainer } from "@/components/profile/ProfileTasksDesktop";
import { ProfileTasksMobileContainer } from "@/components/profile/ProfileTasksMobile";

export default async function AppProfileTasksPage() {
  return (
    <ProfileTasksPage
      ProfileTasksDesktopContainer={ProfileTasksDesktopContainer}
      ProfileTasksMobileContainer={ProfileTasksMobileContainer}
      ProfileHeaderContainer={ProfileHeaderContainer}
    />
  );
}
