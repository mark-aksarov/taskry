import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";
import { useTranslations } from "next-intl";

import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskDetailCard } from "@/components/tasks/TaskDetailCard/TaskDetailCard";

interface TaskDetailPageProps {
  taskDetailCardHeadingContainer: React.ReactNode;
  taskDetailContainer: React.ReactNode;
  taskDetailFormContainer: React.ReactNode;
}

export function TaskDetailPage({
  taskDetailCardHeadingContainer,
  taskDetailContainer,
  taskDetailFormContainer,
}: TaskDetailPageProps) {
  const t = useTranslations("app.TaskDetailPage");

  return (
    <PageContainer>
      <PageGrid>
        <ToolbarMobileTop>
          <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
        </ToolbarMobileTop>
        <TaskDetailCard
          taskDetailCardHeading={taskDetailCardHeadingContainer}
          taskDetail={taskDetailContainer}
          taskDetailForm={taskDetailFormContainer}
        />
      </PageGrid>
    </PageContainer>
  );
}
