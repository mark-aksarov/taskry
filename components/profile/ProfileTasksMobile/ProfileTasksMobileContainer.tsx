import { getTasks } from "@/lib/queries/task";
import { ProfileTasksMobile } from "../ProfileTasksMobile";
import { ProfileTasksMobileEmpty } from "./ProfileTasksMobileEmpty";

export async function ProfileTasksMobileContainer() {
  const tasks = await getTasks("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  if (!tasks.length) {
    return <ProfileTasksMobileEmpty />;
  }

  return <ProfileTasksMobile tasks={tasks} />;
}
