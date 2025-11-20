import { Suspense } from "react";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { DetailCardHeadingSkeleton } from "@/components/common/DetailCard";
import { TaskDetailFormSkeleton } from "@/components/tasks/TaskDetailForm";
import { TaskDetailCompactSkeleton } from "@/components/tasks/TaskDetailCompact";
import { TaskDetailCard } from "@/components/tasks/TaskDetailCard/TaskDetailCard";
import { TaskDetailFullSkeleton } from "@/components/tasks/TaskDetailFull/TaskDetailFullSkeleton";

interface TaskDetailPageProps {
  id: number;
  TaskDetailCardHeadingServerContainer: React.ComponentType<{ id: number }>;
  TaskDetailContainer: React.ComponentType<{
    id: number;
  }>;
  TaskDetailFormContainer: React.ComponentType;
}

export function TaskDetailPage({
  id,
  TaskDetailCardHeadingServerContainer,
  TaskDetailContainer,
  TaskDetailFormContainer,
}: TaskDetailPageProps) {
  return (
    <PageContainer>
      <PageGrid className="items-center">
        <TaskDetailCard
          taskDetailCardHeading={
            <Suspense fallback={<DetailCardHeadingSkeleton />}>
              <TaskDetailCardHeadingServerContainer id={id} />
            </Suspense>
          }
          taskDetail={
            <Suspense fallback={<TaskDetailFullSkeleton />}>
              <TaskDetailContainer id={id} />
            </Suspense>
          }
          taskDetailForm={
            <Suspense fallback={<TaskDetailFormSkeleton />}>
              <TaskDetailFormContainer />
            </Suspense>
          }
        />
      </PageGrid>
    </PageContainer>
  );
}
