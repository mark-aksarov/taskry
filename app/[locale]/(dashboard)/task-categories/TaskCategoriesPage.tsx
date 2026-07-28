import {
  CreateTaskCategoryModalTriggerLarge,
  CreateTaskCategoryModalTriggerMobile,
} from "@/dashboard/taskCategory/CreateTaskCategoryModalTrigger";

import {
  TaskCategoryManageMenuTriggerLarge,
  TaskCategoryManageMenuTriggerMobile,
} from "@/dashboard/taskCategory/TaskCategoryManageMenuTrigger";

import { useTranslations } from "next-intl";
import { BackButton } from "@/dashboard/common/BackButton";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { SelectedItem } from "@/lib/hooks/useSelectedItemsState";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { PageEmptySection } from "@/dashboard/common/PageEmptySection";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { ToolbarLarge, ToolbarMobile } from "@/dashboard/common/Toolbar";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { CreateTaskCategoryModal } from "@/dashboard/taskCategory/CreateTaskCategoryModal";
import { DeleteTaskCategoriesModal } from "@/dashboard/taskCategory/DeleteTaskCategoriesModal";
import { ImportTaskCategoriesModal } from "@/dashboard/taskCategory/ImportTaskCategoriesModal";
import { CreateTaskCategoryProvider } from "@/dashboard/taskCategory/CreateTaskCategoryContext";
import { DeleteTaskCategoriesProvider } from "@/dashboard/taskCategory/DeleteTaskCategoriesContext";
import { TaskCategoryActionsMenuTrigger } from "@/dashboard/taskCategory/TaskCategoryActionsMenuTrigger";
import { TaskCategoriesEmptySectionCreateButton } from "@/dashboard/taskCategory/TaskCategoriesEmptySectionCreateButton";

interface TaskCategoriesPageProps {
  totalCount: number;
  selectedItems: SelectedItem[];
  taskCategoriesContainer: React.ReactNode;
  searchContainer: React.ReactNode;
}

export function TaskCategoriesPage({
  totalCount,
  selectedItems,
  taskCategoriesContainer,
  searchContainer,
}: TaskCategoriesPageProps) {
  const t = useTranslations("app.TaskCategoriesPage");

  const isEmpty = totalCount === 0;

  return (
    <SelectedItemsProvider pageItems={selectedItems}>
      <DeleteTaskCategoriesProvider>
        <CreateTaskCategoryProvider>
          <DashboardContainer fullscreen={isEmpty} headerOffset={isEmpty}>
            <DashboardGrid
              className={isEmpty ? "relative flex-auto" : undefined}
            >
              {isEmpty ? (
                <>
                  <ToolbarLarge
                    firstSlot={<TaskCategoryManageMenuTriggerLarge />}
                  />

                  <ToolbarMobile
                    firstSlot={
                      <>
                        <BackButton fallbackHref="/tasks" />
                        <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
                      </>
                    }
                    secondSlot={<TaskCategoryManageMenuTriggerMobile />}
                  />

                  <PageEmptySection
                    heading={t("emptySection.heading")}
                    description={t("emptySection.description")}
                    createButton={<TaskCategoriesEmptySectionCreateButton />}
                  />
                </>
              ) : (
                <ViewModeProvider>
                  <ToolbarLarge
                    firstSlot={
                      <>
                        <TaskCategoryManageMenuTriggerLarge />
                        <TaskCategoryActionsMenuTrigger />
                      </>
                    }
                    secondSlot={<CreateTaskCategoryModalTriggerLarge />}
                  />

                  <ToolbarMobile
                    firstSlot={
                      <>
                        <BackButton fallbackHref="/tasks" />
                        <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
                      </>
                    }
                    secondSlot={
                      <>
                        <TaskCategoryManageMenuTriggerMobile />
                        <CreateTaskCategoryModalTriggerMobile />
                      </>
                    }
                  />

                  {taskCategoriesContainer}
                </ViewModeProvider>
              )}
            </DashboardGrid>
          </DashboardContainer>

          <TaskSearchModal searchContainer={searchContainer} />
          <CreateTaskCategoryModal />
          <DeleteTaskCategoriesModal />
          <ImportTaskCategoriesModal />
        </CreateTaskCategoryProvider>
      </DeleteTaskCategoriesProvider>
    </SelectedItemsProvider>
  );
}
