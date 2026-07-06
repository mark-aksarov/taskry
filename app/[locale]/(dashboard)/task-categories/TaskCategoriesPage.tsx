import {
  CreateTaskCategoryModalTriggerLarge,
  CreateTaskCategoryModalTriggerMobile,
} from "@/dashboard/taskCategory/CreateTaskCategoryModalTrigger";

import { useTranslations } from "next-intl";
import { BackButton } from "@/dashboard/common/BackButton";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { PageEmptySection } from "@/dashboard/common/PageEmptySection";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { ToolbarLarge, ToolbarMobile } from "@/dashboard/common/Toolbar";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { TaskCategoryActionsMenuTrigger } from "@/dashboard/taskCategory/TaskCategoryActionsMenuTrigger";
import { TaskCategoriesEmptySectionCreateButton } from "@/dashboard/taskCategory/TaskCategoriesEmptySectionCreateButton";

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
      <DashboardContainer fullscreen headerOffset>
        <DashboardGrid className="relative flex-auto">
          <ToolbarMobile
            firstSlot={
              <>
                <BackButton fallbackHref="/tasks" />
                <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
              </>
            }
          />

          <PageEmptySection
            heading={t("emptySection.heading")}
            description={t("emptySection.description")}
            createButton={<TaskCategoriesEmptySectionCreateButton />}
          />
        </DashboardGrid>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardGrid>
        <ViewModeProvider>
          <ToolbarLarge
            firstSlot={<TaskCategoryActionsMenuTrigger />}
            secondSlot={<CreateTaskCategoryModalTriggerLarge />}
          />

          <ToolbarMobile
            firstSlot={
              <>
                <BackButton fallbackHref="/tasks" />
                <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
              </>
            }
            secondSlot={<CreateTaskCategoryModalTriggerMobile />}
          />
          {taskCategoriesContainer}
        </ViewModeProvider>
      </DashboardGrid>
    </DashboardContainer>
  );
}
