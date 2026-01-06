import { Suspense } from "react";
import { TaskDetailPage } from "./TaskDetailPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { DetailCardHeadingSkeleton } from "@/components/common/DetailCard";
import { TaskDetailFullSkeleton } from "@/components/tasks/TaskDetailFull";
import { TaskDetailFormSkeleton } from "@/components/tasks/TaskDetailForm";
import { TaskDetailFormContainer } from "@/components/tasks/TaskDetailFormContainer";
import { TaskDetailFullContainer } from "@/components/tasks/TaskDetailFullContainer";
import { TaskDetailCardHeadingContainer } from "@/components/tasks/TaskDetailCardHeadingContainer";

export default async function AppTaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireProtectedPage();
  const { id: idStr } = await params;
  const id = Number(idStr);

  return (
    <TaskDetailPage
      taskDetailCardHeadingContainer={
        <Suspense fallback={<DetailCardHeadingSkeleton />}>
          <TaskDetailCardHeadingContainer id={id} />
        </Suspense>
      }
      taskDetailContainer={
        <Suspense fallback={<TaskDetailFullSkeleton />}>
          <TaskDetailFullContainer id={id} />
        </Suspense>
      }
      taskDetailFormContainer={
        <Suspense fallback={<TaskDetailFormSkeleton />}>
          <TaskDetailFormContainer />
        </Suspense>
      }
    />
  );
}
