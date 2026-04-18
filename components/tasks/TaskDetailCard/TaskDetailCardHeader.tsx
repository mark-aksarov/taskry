import {
  DetailCardAltHeader,
  DetailCardAltHeaderSkeleton,
} from "@/components/common/DetailCardAlt";

import { useTranslations } from "next-intl";
import { TaskStatusBadge } from "../TaskStatusBadge";
import { TaskStatus } from "@/generated/prisma/enums";
import { DeleteTaskModalTrigger } from "../DeleteTaskModalTrigger";

interface TaskDetailCardHeaderProps {
  taskStatus: TaskStatus;
  taskDeadline: string;
}

export function TaskDetailCardHeader({
  taskStatus,
  taskDeadline,
}: TaskDetailCardHeaderProps) {
  const t = useTranslations("tasks.TaskDetailCard");

  return (
    <DetailCardAltHeader
      title={t("title")}
      statusSlot={
        <TaskStatusBadge status={taskStatus} deadline={taskDeadline} />
      }
      deadline={taskDeadline}
      deleteButtonSlot={<DeleteTaskModalTrigger />}
    />
  );
}

export function TaskDetailCardHeaderSkeleton() {
  const t = useTranslations("tasks.TaskDetailCard");

  return <DetailCardAltHeaderSkeleton title={t("title")} />;
}
