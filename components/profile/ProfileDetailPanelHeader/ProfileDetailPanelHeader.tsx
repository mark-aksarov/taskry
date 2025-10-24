import { getUserById } from "@/lib/queries/user";
import { ProfileDetailPanelHeaderInner } from "./ProfileDetailPanelHeaderInner";

export async function ProfileDetailPanelHeader() {
  const user = await getUserById("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  return <ProfileDetailPanelHeaderInner user={user} />;
}
