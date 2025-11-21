import { TeamProfilePage } from "./TeamProfilePage";
import { ProfileHeaderServerContainer } from "@/components/profile/ProfileHeaderServerContainer";
import { ProfileDetailServerContainer } from "@/components/profile/ProfileDetailServerContainer";

export default async function AppProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <TeamProfilePage
      userId={id}
      ProfileDetailContainer={ProfileDetailServerContainer}
      ProfileHeaderContainer={ProfileHeaderServerContainer}
    />
  );
}
