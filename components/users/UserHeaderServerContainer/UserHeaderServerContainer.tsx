import { PersonHeader } from "@/components/common/PersonHeader";
import { getUserDetails } from "@/lib/queries/user";

export async function UserHeaderServerContainer({
  userId,
}: {
  userId: string;
}) {
  const user = await getUserDetails(userId);

  return (
    <PersonHeader
      title={user.fullName}
      imageUrl={user.imageUrl ?? undefined}
      subtitle={user.position ? user.position.name : "Unknown position"}
    />
  );
}
