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
import { PageEmptySection } from "@/components/common/PageEmptySection";
import { NewTaskCategoryModal } from "@/components/taskCategory/NewTaskCategoryModal";
import { TaskCategoryToolbarActionsMenuTrigger } from "@/components/taskCategory/TaskCategoryToolbarActionsMenuTrigger";
import { TaskCategoriesEmptySectionCreateButton } from "@/components/taskCategory/TaskCategoriesEmptySectionCreateButton";
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
        <PageContainer fullscreen headerOffset>
          <PageGrid className="relative flex-auto">
            <ToolbarMobileTop>
              <BackButton href="/customers" />
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            </ToolbarMobileTop>

            <PageEmptySection
              heading={t("emptySection.heading")}
              description={t("emptySection.description")}
              createButton={<TaskCategoriesEmptySectionCreateButton />}
            />
          </PageGrid>
        </PageContainer>

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
