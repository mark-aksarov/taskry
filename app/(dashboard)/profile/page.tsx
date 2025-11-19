import { ProfilePage } from "./ProfilePage";
import { ProfileHeaderServerContainer } from "@/components/profile/ProfileHeaderServerContainer";
import { ProfileInfoServerContainer } from "@/components/profile/ProfileInfoServerContainer";

export default async function AppProfilePage() {
  return (
    <ProfilePage
      ProfileInfoContainer={ProfileInfoServerContainer}
      ProfileHeaderContainer={ProfileHeaderServerContainer}
    />
  );
}
