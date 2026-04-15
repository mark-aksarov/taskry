import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { TaskDetailCard } from "@/components/tasks/TaskDetailCard/TaskDetailCard";

interface TaskDetailPageProps {
  taskDetailContainer: React.ReactNode;
}

export function TaskDetailPage({ taskDetailContainer }: TaskDetailPageProps) {
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

        <TaskDetailCard taskDetailContainer={taskDetailContainer} />
      </PageGrid>
    </PageContainer>
  );
}
