import { useTranslations } from "next-intl";
import { DetailHeader } from "@/dashboard/common/DetailHeader";
import { TaskDetailHeaderImage } from "./TaskDetailHeaderImage";

interface TaskDetailHeaderProps {
  taskTitle: string;
  categoryName?: string;
}

export function TaskDetailHeader({
  taskTitle,
  categoryName,
}: TaskDetailHeaderProps) {
  const t = useTranslations("dashboard.tasks.TaskDetailHeader");

  return (
    <DetailHeader
      title={taskTitle}
      imageSlot={<TaskDetailHeaderImage />}
      subtitle={categoryName ? categoryName : t("noCategory")}
    />
  );
}
