import { useTranslations } from "next-intl";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { BackButton } from "@/dashboard/common/BackButton";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { TaskDetailCard } from "@/dashboard/tasks/TaskDetailCard";
import { TaskDetailAltSkeleton } from "@/dashboard/tasks/TaskDetailAlt";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { TaskDetailCardHeaderSkeleton } from "@/dashboard/tasks/TaskDetailCard";

export default function AppTaskDetailLoading() {
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
        />

        <TaskDetailCard
          taskDetailCardHeaderContainer={<TaskDetailCardHeaderSkeleton />}
          taskDetailContainer={<TaskDetailAltSkeleton />}
        />
      </DashboardGrid>
    </DashboardContainer>
  );
}
