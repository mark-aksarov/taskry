import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskDetailCard } from "@/components/tasks/TaskDetailCard/TaskDetailCard";
import { Suspense } from "react";
import { TaskDetailSkeleton } from "@/components/tasks/TaskDetail";

interface TaskDetailPageProps {
  id: number;
  TaskDetailContainer: React.ComponentType<{
    id: number;
  }>;
}

export function TaskDetailPage({
  id,
  TaskDetailContainer,
}: TaskDetailPageProps) {
  return (
    <PageContainer>
      <PageGrid className="items-center">
        <TaskDetailCard
          taskDetail={
            <Suspense fallback={<TaskDetailSkeleton />}>
              <TaskDetailContainer id={id} />
            </Suspense>
          }
        />
      </PageGrid>
    </PageContainer>
  );
}
