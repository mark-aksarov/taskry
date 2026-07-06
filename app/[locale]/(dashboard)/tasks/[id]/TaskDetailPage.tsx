import { useTranslations } from "next-intl";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { BackButton } from "@/dashboard/common/BackButton";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
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
    <DashboardContainer>
      <DashboardGrid>
        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/tasks" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
          secondSlot={<DeleteTaskModalTrigger buttonVariant="secondary" />}
        />

        <TaskDetailCard
          taskDetailCardHeaderContainer={taskDetailCardHeaderContainer}
          taskDetailContainer={taskDetailContainer}
        />
      </DashboardGrid>
    </DashboardContainer>
  );
}
