import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskDetailCard } from "@/components/tasks/TaskDetailCard";
import { TaskDetailActions } from "@/components/tasks/TaskDetailActions";

interface TaskDetailPageProps {
  taskDetailContainer: React.ReactNode;
  taskHeaderContainer: React.ReactNode;
}

export function TaskDetailPage({
  taskDetailContainer,
  taskHeaderContainer,
}: TaskDetailPageProps) {
  const t = useTranslations("app.TaskDetailPage");

  return (
    <PageContainer>
      <TaskDetailCard
        taskDetail={taskDetailContainer}
        taskDetailHeader={taskHeaderContainer}
      />

      <PageGrid className="md:hidden">
        <ToolbarMobileTop>
          <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
        </ToolbarMobileTop>

        <div className="flex flex-col px-1.5">{taskHeaderContainer}</div>

        <Card className="flex flex-col px-1.5">
          <TaskDetailActions />
        </Card>

        <Card className="flex flex-col">{taskDetailContainer}</Card>
      </PageGrid>
    </PageContainer>
  );
}
