import TaskDetailNotFound from "./TaskDetailNotFound";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";

export default function NotFound() {
  return <TaskDetailNotFound appHeaderProps={defaultAppHeaderSlots} />;
}
