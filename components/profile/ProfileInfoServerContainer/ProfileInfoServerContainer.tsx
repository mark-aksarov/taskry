import { ProfileInfo } from "../ProfileInfo";
import { getUserById } from "@/lib/queries/user";

export async function ProfileInfoServerContainer() {
  const user = await getUserById("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  return (
    <ProfileInfo
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
