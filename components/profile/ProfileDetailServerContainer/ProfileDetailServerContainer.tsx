import { ProfileDetail } from "../ProfileDetail";
import { getUserDetails } from "@/lib/queries/user";

export async function ProfileDetailServerContainer() {
  const user = await getUserDetails("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

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
