import { TeamProfilePage } from "./TeamProfilePage";
import { UserHeaderServerContainer } from "@/components/users/UserHeaderServerContainer";
import { UserDetailServerContainer } from "@/components/users/UserDetailServerContainer";

export default async function AppProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <TeamProfilePage
      userId={id}
      UserDetailContainer={UserDetailServerContainer}
      UserHeaderContainer={UserHeaderServerContainer}
    />
  );
}
