import { UserHeader } from "../UserHeader";
import { getUserDetails } from "@/lib/queries/user";

export async function UserHeaderServerContainer({
  userId,
}: {
  userId: string;
}) {
  const user = await getUserDetails(userId);

  return (
    <UserHeader
      fullName={user.fullName}
      imageUrl={user.imageUrl ?? undefined}
      position={user.position ? { name: user.position.name } : undefined}
    />
  );
}
