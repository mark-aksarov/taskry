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
import { SelectionProvider } from "@/components/common/SelectionContext";

interface TaskCategoriesPageProps {
  taskCategoriesContainer: React.ReactNode;
  taskCategoryToolbarCreateNewButton: React.ReactNode;
  taskToolbarActionsMenuTrigger: React.ReactNode;
}

export function TaskCategoriesPage({
  taskCategoriesContainer,
  taskCategoryToolbarCreateNewButton,
  taskToolbarActionsMenuTrigger,
}: TaskCategoriesPageProps) {
  const t = useTranslations("app.TaskCategoriesPage");

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <SelectionProvider>
            <ToolbarDesktop>
              {taskToolbarActionsMenuTrigger}
              {taskCategoryToolbarCreateNewButton}
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              {taskToolbarActionsMenuTrigger}
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <div className="ml-auto">
                {taskCategoryToolbarCreateNewButton}
              </div>
            </ToolbarMobileBottom>

            {taskCategoriesContainer}
          </SelectionProvider>
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
