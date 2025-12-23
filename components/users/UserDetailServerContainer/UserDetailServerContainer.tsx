import { UserDetail } from "../UserDetail";
import { getUserDetail } from "@/lib/data/user/user.dal";

export async function UserDetailServerContainer({
  userId,
}: {
  userId: string;
}) {
  const user = await getUserDetail(userId);

  return (
    <UserDetail
      id={user.id}
      fullName={user.fullName}
      bio={user.bio ?? undefined}
      email={user.email}
      phoneNumber={user.phoneNumber ?? undefined}
      address={user.address ?? undefined}
      publicLink={user.publicLink ?? undefined}
      birthdate={user.birthdate ?? undefined}
      position={user.position ?? undefined}
    />
  );
}
