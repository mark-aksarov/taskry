import {
  DetailCard,
  DetailCardHeader,
  DetailCardLeft,
  DetailCardTitle,
} from "@/components/common/Detail";
import { DetailPanel } from "@/components/common/DetailPanel";
import { TaskDetailNavigation } from "@/components/tasks/TaskDetailNavigation";
import {
  TaskDetailPanelHeader,
  TaskDetailPanelHeaderSkeleton,
} from "@/components/tasks/TaskDetailPanelHeader";
import { TaskInfo, TaskInfoSkeleton } from "@/components/tasks/TaskInfo";
import { getTask } from "@/lib/queries/task";
import { Suspense } from "react";

export async function TaskDetailCard({ id }: { id: number }) {
  const taskPromise = getTask(id);

  return (
    <DetailCard className="h-full max-md:hidden">
      <DetailCardLeft>
        <DetailCardHeader>
          <DetailCardTitle>Task Information</DetailCardTitle>
        </DetailCardHeader>
        <div className="p-6">
          <Suspense fallback={<TaskInfoSkeleton />}>
            <TaskInfo taskPromise={taskPromise} />
          </Suspense>
        </div>
      </DetailCardLeft>

      <DetailPanel>
        <Suspense fallback={<TaskDetailPanelHeaderSkeleton />}>
          <TaskDetailPanelHeader id={id} />
        </Suspense>
        <TaskDetailNavigation />
      </DetailPanel>
    </DetailCard>
  );
}
