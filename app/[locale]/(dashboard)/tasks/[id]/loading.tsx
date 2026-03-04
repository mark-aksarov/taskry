import TaskDetailLoading from "./TaskDetailLoading";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";

export default function AppTaskDetailLoading() {
  return <TaskDetailLoading appHeaderProps={defaultAppHeaderSlots} />;
}
