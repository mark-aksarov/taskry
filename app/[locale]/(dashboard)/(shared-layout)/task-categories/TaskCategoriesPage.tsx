import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { NewTaskCategoryModal } from "@/components/taskCategory/NewTaskCategoryModal";
import { TaskCategoryToolbarActionsMenuTrigger } from "@/components/taskCategory/TaskCategoryToolbarActionsMenuTrigger";
import { TaskCategoryToolbarCreateNewModalTrigger } from "@/components/taskCategory/TaskCategoryToolbarCreateNewModalTrigger";

interface TaskCategoriesPageProps {
  totalCount: number;
  taskCategoriesContainer: React.ReactNode;
}

export function TaskCategoriesPage({
  totalCount,
  taskCategoriesContainer,
}: TaskCategoriesPageProps) {
  const t = useTranslations("app.TaskCategoriesPage");

  if (totalCount === 0) {
    return (
      <>
        <EmptyPageContainer
          heading={t("emptySection.heading")}
          description={t("emptySection.description")}
          toolbarCreateNewMenuTrigger={
            <TaskCategoryToolbarCreateNewModalTrigger />
          }
        />
        <NewTaskCategoryModal />
      </>
    );
  }

  return (
    <>
      <PageContainer>
        <PageGrid>
          <ViewModeProvider>
            <ToolbarDesktop>
              <TaskCategoryToolbarActionsMenuTrigger />
              <TaskCategoryToolbarCreateNewModalTrigger />
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <BackButton href="/tasks" />
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              <TaskCategoryToolbarActionsMenuTrigger />
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <div className="ml-auto">
                <TaskCategoryToolbarCreateNewModalTrigger />
              </div>
            </ToolbarMobileBottom>

            {taskCategoriesContainer}
          </ViewModeProvider>
        </PageGrid>
      </PageContainer>

      <NewTaskCategoryModal />
    </>
  );
}
