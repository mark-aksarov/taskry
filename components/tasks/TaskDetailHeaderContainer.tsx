import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTaskDetail } from "@/lib/data/task/task.dal";
import { DetailHeaderSkeleton } from "../common/DetailHeader";
import { DetailHeader } from "@/components/common/DetailHeader";
import { TaskDetailHeaderImage } from "./TaskDetailHeaderImage";
import { useTranslations } from "next-intl";

interface TaskDetailHeaderContainerProps {
  taskId: number;
}

export function TaskDetailHeaderContainer(
  props: TaskDetailHeaderContainerProps,
) {
  return (
    <Suspense fallback={<DetailHeaderSkeleton />}>
      <TaskDetailHeaderContainerInner {...props} />
    </Suspense>
  );
}

async function TaskDetailHeaderContainerInner({
  taskId,
}: TaskDetailHeaderContainerProps) {
  const t = useTranslations("tasks.TaskDetailHeaderContainer");

  const task = await getTaskDetail(taskId);

  if (!task) {
    notFound();
  }

  return (
    <DetailHeader
      title={task.title}
      image={<TaskDetailHeaderImage />}
      subtitle={task.category ? task.category.name : t("noCategory")}
    />
  );
}
