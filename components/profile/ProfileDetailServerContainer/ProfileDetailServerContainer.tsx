import { ProfileDetail } from "../ProfileDetail";
import { getUserDetails } from "@/lib/queries/user";

export async function ProfileDetailServerContainer({
  userId,
}: {
  userId: string;
}) {
  const user = await getUserDetails(userId);

  return (
    <ProfileDetail
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
