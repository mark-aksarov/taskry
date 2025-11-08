import { getTasks } from "@/lib/queries/task";
import { ProfileTasksDesktop } from "./ProfileTasksDesktop";
import { ProfileTasksDesktopEmpty } from "./ProfileTasksDesktopEmpty";

export async function ProfileTasksDesktopContainer() {
  const tasks = await getTasks("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  if (!tasks.length) {
    return <ProfileTasksDesktopEmpty />;
  }

  return <ProfileTasksDesktop tasks={tasks} />;
}
