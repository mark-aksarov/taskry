import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { BackButton } from "@/components/common/BackButton";
import { TaskCategoryToolbarCreateNewModalTrigger } from "@/components/taskCategory/TaskCategoryToolbarCreateNewModalTrigger";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { TaskCategoryToolbarActionsMenuTrigger } from "@/components/taskCategory/TaskCategoryToolbarActionsMenuTrigger";

interface TaskCategoriesPageProps {
  taskCategoriesContainer: React.ReactNode;
  createTaskCategory: ActionFn<ActionState, FormData>;
  deleteTaskCategories: ActionFn<ActionState, number[]>;
}

export function TaskCategoriesPage({
  taskCategoriesContainer,
  createTaskCategory,
  deleteTaskCategories,
}: TaskCategoriesPageProps) {
  const t = useTranslations("app.TaskCategoriesPage");

  const taskCategoryToolbarCreateNewModalTrigger = (
    <TaskCategoryToolbarCreateNewModalTrigger
      createTaskCategory={createTaskCategory}
    />
  );

  const taskCategoryToolbarActionsMenuTrigger = (
    <TaskCategoryToolbarActionsMenuTrigger
      deleteTaskCategories={deleteTaskCategories}
    />
  );

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            {taskCategoryToolbarActionsMenuTrigger}
            {taskCategoryToolbarCreateNewModalTrigger}
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <BackButton href="/tasks" />
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            {taskCategoryToolbarActionsMenuTrigger}
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <div className="ml-auto">
              {taskCategoryToolbarCreateNewModalTrigger}
            </div>
          </ToolbarMobileBottom>

          {taskCategoriesContainer}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
