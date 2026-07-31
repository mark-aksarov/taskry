import {
  DetailCardAltHeader,
  DetailCardAltHeaderSkeleton,
} from "@/dashboard/common/DetailCardAlt";

import { useTranslations } from "next-intl";
import { TaskStatusBadge } from "../TaskStatusBadge";
import { TaskStatus } from "@/generated/prisma/enums";
import { DeleteTaskModalTrigger } from "../DeleteTaskModalTrigger";

interface TaskDetailCardHeaderProps {
  taskStatus: TaskStatus;
}

export function TaskDetailCardHeader({
  taskStatus,
}: TaskDetailCardHeaderProps) {
  const t = useTranslations("dashboard.tasks.TaskDetailCard");

  return (
    <DetailCardAltHeader
      title={t("title")}
      statusSlot={<TaskStatusBadge status={taskStatus} />}
      deleteButtonSlot={<DeleteTaskModalTrigger buttonVariant="primary" />}
    />
  );
}

export function TaskDetailCardHeaderSkeleton() {
  const t = useTranslations("dashboard.tasks.TaskDetailCard");

  return <DetailCardAltHeaderSkeleton title={t("title")} />;
}
