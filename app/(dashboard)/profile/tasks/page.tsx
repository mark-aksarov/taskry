import { ProfileTasksPage } from "./ProfileTasksPage";
import { ProfileHeaderServerContainer } from "@/components/profile/ProfileHeaderServerContainer";
import { ProfileTasksMobileServerContainer } from "@/components/profile/ProfileTasksMobileServerContainer";
import { ProfileTasksDesktopServerContainer } from "@/components/profile/ProfileTasksDesktopServerContainer";

export default async function AppProfileTasksPage() {
  return (
    <ProfileTasksPage
      ProfileTasksDesktopContainer={ProfileTasksDesktopServerContainer}
      ProfileTasksMobileContainer={ProfileTasksMobileServerContainer}
      ProfileHeaderContainer={ProfileHeaderServerContainer}
    />
  );
}
