import { useTranslations } from "next-intl";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { BackButton } from "@/dashboard/common/BackButton";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { TaskDetailCard } from "@/dashboard/tasks/TaskDetailCard";
import { TaskDetailAltSkeleton } from "@/dashboard/tasks/TaskDetailAlt";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { TaskDetailCardHeaderSkeleton } from "@/dashboard/tasks/TaskDetailCard";

export default function AppTaskDetailLoading() {
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
        />

        <TaskDetailCard
          taskDetailCardHeaderContainer={<TaskDetailCardHeaderSkeleton />}
          taskDetailContainer={<TaskDetailAltSkeleton />}
        />
      </PageGrid>
    </PageContainer>
  );
}
