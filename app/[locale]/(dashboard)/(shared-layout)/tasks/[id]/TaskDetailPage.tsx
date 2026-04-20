import { useTranslations } from "next-intl";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { BackButton } from "@/dashboard/common/BackButton";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { TaskDetailCard } from "@/dashboard/tasks/TaskDetailCard/TaskDetailCard";
import { DeleteTaskModalTrigger } from "@/dashboard/tasks/DeleteTaskModalTrigger";

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
          secondSlot={<DeleteTaskModalTrigger />}
        />

        <TaskDetailCard
          taskDetailCardHeaderContainer={taskDetailCardHeaderContainer}
          taskDetailContainer={taskDetailContainer}
        />
      </PageGrid>
    </PageContainer>
  );
}
