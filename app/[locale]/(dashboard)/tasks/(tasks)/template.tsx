import TasksTemplate from "./TasksTemplate";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";

interface TasksTemplateProps {
  children: React.ReactNode;
}

export default async function AppTasksTemplate({
  children,
}: TasksTemplateProps) {
  return <TasksTemplate {...defaultAppHeaderSlots}>{children}</TasksTemplate>;
}
