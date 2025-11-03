import { getUserById } from "@/lib/queries/user";
import { ProfileHeaderInner } from "./ProfileHeaderInner";

export async function ProfileHeader() {
  const user = await getUserById("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  return <ProfileHeaderInner user={user} />;
}
