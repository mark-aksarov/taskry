import { ProfilePage } from "./ProfilePage";
import { ProfileHeaderContainer } from "@/components/profile/ProfileHeader";
import { ProfileInfoContainer } from "@/components/profile/ProfileInfo";

export default async function AppProfilePage() {
  return (
    <ProfilePage
      ProfileInfoContainer={ProfileInfoContainer}
      ProfileHeaderContainer={ProfileHeaderContainer}
    />
  );
}
