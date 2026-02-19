import TaskCategoriesTemplate from "./TaskCategoriesTemplate";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";

interface TaskCategoriesTemplateProps {
  children: React.ReactNode;
}

export default async function AppTaskCategoriesTemplate({
  children,
}: TaskCategoriesTemplateProps) {
  return (
    <TaskCategoriesTemplate {...defaultAppHeaderSlots}>
      {children}
    </TaskCategoriesTemplate>
  );
}
