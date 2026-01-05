import { TeamProfilePage } from "./TeamProfilePage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UserHeaderContainer } from "@/components/users/UserHeaderContainer";
import { ProfileDetailContainer } from "@/components/users/ProfileDetailContainer";

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
      ProfileDetailContainer={ProfileDetailContainer}
      UserHeaderContainer={UserHeaderContainer}
    />
  );
}
