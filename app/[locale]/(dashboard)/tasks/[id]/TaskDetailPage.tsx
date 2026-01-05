import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";
import { useTranslations } from "next-intl";

import { Suspense } from "react";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { DetailCardHeadingSkeleton } from "@/components/common/DetailCard";
import { TaskDetailFormSkeleton } from "@/components/tasks/TaskDetailForm";
import { TaskDetailCard } from "@/components/tasks/TaskDetailCard/TaskDetailCard";
import { TaskDetailFullSkeleton } from "@/components/tasks/TaskDetailFull/TaskDetailFullSkeleton";

interface TaskDetailPageProps {
  id: number;
  TaskDetailCardHeadingContainer: React.ComponentType<{ id: number }>;
  TaskDetailContainer: React.ComponentType<{
    id: number;
  }>;
  TaskDetailFormContainer: React.ComponentType;
}

export function TaskDetailPage({
  id,
  TaskDetailCardHeadingContainer,
  TaskDetailContainer,
  TaskDetailFormContainer,
}: TaskDetailPageProps) {
  const t = useTranslations("app.TaskDetailPage");

  return (
    <PageContainer>
      <PageGrid>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
        </ToolbarMobileTop>
        <TaskDetailCard
          taskDetailCardHeading={
            <Suspense fallback={<DetailCardHeadingSkeleton />}>
              <TaskDetailCardHeadingContainer id={id} />
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
