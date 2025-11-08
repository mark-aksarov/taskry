import { ProfileInfo } from "./ProfileInfo";
import { getUserById } from "@/lib/queries/user";

export async function ProfileInfoContainer() {
  const user = await getUserById("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  return <ProfileInfo user={user} />;
}
