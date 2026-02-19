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

interface TaskCategoriesPageProps {
  taskCategoriesContainer: React.ReactNode;
  taskCategoryToolbarCreateNewModalTrigger: React.ReactNode;
  taskCategoryToolbarActionsMenuTrigger: React.ReactNode;
}

export function TaskCategoriesPage({
  taskCategoriesContainer,
  taskCategoryToolbarCreateNewModalTrigger,
  taskCategoryToolbarActionsMenuTrigger,
}: TaskCategoriesPageProps) {
  const t = useTranslations("app.TaskCategoriesPage");

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            {taskCategoryToolbarActionsMenuTrigger}
            {taskCategoryToolbarCreateNewModalTrigger}
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <BackButton />
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
