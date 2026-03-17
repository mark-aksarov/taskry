import {
  CreateTaskCategoryModalTriggerLarge,
  CreateTaskCategoryModalTriggerMobile,
} from "@/components/taskCategory/CreateTaskCategoryModalTrigger";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { PageEmptySection } from "@/components/common/PageEmptySection";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { ToolbarLarge, ToolbarMobile } from "@/components/common/Toolbar";
import { NewTaskCategoryModal } from "@/components/taskCategory/NewTaskCategoryModal";
import { TaskCategoryActionsMenuTrigger } from "@/components/taskCategory/TaskCategoryActionsMenuTrigger";
import { TaskCategoriesEmptySectionCreateButton } from "@/components/taskCategory/TaskCategoriesEmptySectionCreateButton";

interface TaskCategoriesPageProps {
  totalCount: number;
  searchContainer: React.ReactNode;
  taskCategoriesContainer: React.ReactNode;
}

export function TaskCategoriesPage({
  totalCount,
  searchContainer,
  taskCategoriesContainer,
}: TaskCategoriesPageProps) {
  const t = useTranslations("app.TaskCategoriesPage");

  if (totalCount === 0) {
    return (
      <>
        <PageContainer fullscreen headerOffset>
          <PageGrid className="relative flex-auto">
            <ToolbarMobile
              firstSlot={
                <>
                  <BackButton href="/tasks" />
                  <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
                </>
              }
            />

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
            <ToolbarLarge
              firstSlot={<TaskCategoryActionsMenuTrigger />}
              secondSlot={<CreateTaskCategoryModalTriggerLarge />}
            />

            <ToolbarMobile
              firstSlot={
                <>
                  <BackButton href="/tasks" />
                  <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
                </>
              }
              secondSlot={<CreateTaskCategoryModalTriggerMobile />}
            />
            {taskCategoriesContainer}
          </ViewModeProvider>
        </PageGrid>
      </PageContainer>

      <TaskSearchModal searchContainer={searchContainer} />
      <NewTaskCategoryModal />
    </>
  );
}
