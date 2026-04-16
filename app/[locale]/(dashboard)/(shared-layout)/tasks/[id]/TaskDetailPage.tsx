import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { TaskDetailCard } from "@/components/tasks/TaskDetailCard/TaskDetailCard";
import { TaskDetailDeleteButton } from "@/components/tasks/TaskDetailDeleteButton";

interface TaskDetailPageProps {
  taskDetailCardHeaderContainer: React.ReactNode;
  taskDetailContainer: React.ReactNode;
}

export function TaskDetailPage({
  taskDetailCardHeaderContainer,
  taskDetailContainer,
}: TaskDetailPageProps) {
  const t = useTranslations("app.TaskDetailPage");

  return (
    <PageContainer>
      <PageGrid>
        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/tasks" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
          secondSlot={<TaskDetailDeleteButton />}
        />

        <TaskDetailCard
          taskDetailCardHeaderContainer={taskDetailCardHeaderContainer}
          taskDetailContainer={taskDetailContainer}
        />
      </PageGrid>
    </PageContainer>
  );
}
