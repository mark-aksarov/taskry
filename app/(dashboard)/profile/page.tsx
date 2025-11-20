import { ProfilePage } from "./ProfilePage";
import { ProfileHeaderServerContainer } from "@/components/profile/ProfileHeaderServerContainer";
import { ProfileDetailServerContainer } from "@/components/profile/ProfileDetailServerContainer";

export default async function AppProfilePage() {
  return (
    <ProfilePage
      ProfileDetailContainer={ProfileDetailServerContainer}
      ProfileHeaderContainer={ProfileHeaderServerContainer}
    />
  );
}
