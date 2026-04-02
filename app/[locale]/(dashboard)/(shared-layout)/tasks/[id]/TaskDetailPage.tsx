import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskDetailCard } from "@/components/tasks/TaskDetailCard";
import { TaskDetailActions } from "@/components/tasks/TaskDetailActions";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";

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
        taskDetailContainer={taskDetailContainer}
        taskDetailHeaderContainer={taskHeaderContainer}
        taskDetailActions={<TaskDetailActions />}
      />

      <PageGrid className="md:hidden">
        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/tasks" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
        />

        <div className="flex flex-col">{taskHeaderContainer}</div>
        <Card className="flex flex-col p-1.5">{<TaskDetailActions />}</Card>
        <Card className="flex flex-col">{taskDetailContainer}</Card>
      </PageGrid>
    </PageContainer>
  );
}
