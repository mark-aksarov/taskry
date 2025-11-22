import { ProfilePage } from "./ProfilePage";
import { UserHeaderServerContainer } from "@/components/users/UserHeaderServerContainer";
import { UserDetailServerContainer } from "@/components/users/UserDetailServerContainer";

export default async function AppProfilePage() {
  const userId = "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI";

  return (
    <ProfilePage
      userId={userId}
      UserDetailContainer={UserDetailServerContainer}
      UserHeaderContainer={UserHeaderServerContainer}
    />
  );
}
