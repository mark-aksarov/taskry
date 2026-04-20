import {
  CreateTaskCategoryModalTriggerLarge,
  CreateTaskCategoryModalTriggerMobile,
} from "@/dashboard/taskCategory/CreateTaskCategoryModalTrigger";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { BackButton } from "@/dashboard/common/BackButton";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { PageEmptySection } from "@/dashboard/common/PageEmptySection";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { ToolbarLarge, ToolbarMobile } from "@/dashboard/common/Toolbar";
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
      <PageContainer fullscreen headerOffset>
        <PageGrid className="relative flex-auto">
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
        </PageGrid>
      </PageContainer>
    );
  }

  return (
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
                <BackButton fallbackHref="/tasks" />
                <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
              </>
            }
            secondSlot={<CreateTaskCategoryModalTriggerMobile />}
          />
          {taskCategoriesContainer}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
