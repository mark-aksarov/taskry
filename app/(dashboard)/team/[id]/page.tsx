import { ProfilePage } from "@/app/(dashboard)/profile/ProfilePage";
import { ProfileHeaderServerContainer } from "@/components/profile/ProfileHeaderServerContainer";
import { ProfileDetailServerContainer } from "@/components/profile/ProfileDetailServerContainer";

export default async function AppProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <ProfilePage
      userId={id}
      ProfileDetailContainer={ProfileDetailServerContainer}
      ProfileHeaderContainer={ProfileHeaderServerContainer}
    />
  );
}
