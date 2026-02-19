import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskDetailCard } from "@/components/tasks/TaskDetailCard";

interface TaskDetailPageProps {
  taskDetailContainer: React.ReactNode;
  taskHeaderContainer: React.ReactNode;
  taskDetailActions: React.ReactNode;
}

export function TaskDetailPage({
  taskDetailContainer,
  taskHeaderContainer,
  taskDetailActions,
}: TaskDetailPageProps) {
  const t = useTranslations("app.TaskDetailPage");

  return (
    <PageContainer>
      <TaskDetailCard
        taskDetail={taskDetailContainer}
        taskDetailHeader={taskHeaderContainer}
        taskDetailActions={taskDetailActions}
      />

      <PageGrid className="md:hidden">
        <ToolbarMobileTop>
          <BackButton />
          <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
        </ToolbarMobileTop>

        <div className="flex flex-col px-1.5">{taskHeaderContainer}</div>
        <Card className="flex flex-col px-1.5">{taskDetailActions}</Card>
        <Card className="flex flex-col">{taskDetailContainer}</Card>
      </PageGrid>
    </PageContainer>
  );
}
