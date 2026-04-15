import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskDetailCard } from "@/components/tasks/TaskDetailCard";
import { TaskDetailAltSkeleton } from "@/components/tasks/TaskDetailAlt";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";

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

        <TaskDetailCard taskDetailContainer={<TaskDetailAltSkeleton />} />
      </PageGrid>
    </PageContainer>
  );
}
