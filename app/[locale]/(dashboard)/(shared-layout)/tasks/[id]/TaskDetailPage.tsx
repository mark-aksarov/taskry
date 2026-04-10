import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { SubtasksCard } from "@/components/subtasks/SubtasksCard";
import { TaskDetailActions } from "@/components/tasks/TaskDetailActions";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";

interface TaskDetailPageProps {
  subtasksContainer: React.ReactNode;
  taskDetailContainer: React.ReactNode;
  taskHeaderContainer: React.ReactNode;
}

export function TaskDetailPage({
  subtasksContainer,
  taskDetailContainer,
  taskHeaderContainer,
}: TaskDetailPageProps) {
  const t = useTranslations("app.TaskDetailPage");

  return (
    <PageContainer>
      <Card className="max-md:hidden">{taskDetailContainer}</Card>

      <PageGrid className="md:hidden">
        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/tasks" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
        />

        <div>{taskHeaderContainer}</div>
        <Card className="p-1.5">{<TaskDetailActions />}</Card>
        <SubtasksCard subtasksContainer={subtasksContainer} />
        <Card>{taskDetailContainer}</Card>
      </PageGrid>
    </PageContainer>
  );
}
