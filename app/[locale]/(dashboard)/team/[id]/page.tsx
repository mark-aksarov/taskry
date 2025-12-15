import { TeamProfilePage } from "./TeamProfilePage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UserHeaderServerContainer } from "@/components/users/UserHeaderServerContainer";
import { UserDetailServerContainer } from "@/components/users/UserDetailServerContainer";

export default async function AppProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();

  const { id } = await params;

  return (
    <TeamProfilePage
      userId={id}
      UserDetailContainer={UserDetailServerContainer}
      UserHeaderContainer={UserHeaderServerContainer}
    />
  );
}
