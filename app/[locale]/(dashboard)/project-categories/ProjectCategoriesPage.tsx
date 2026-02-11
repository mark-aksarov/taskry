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

interface ProjectCategoriesPageProps {
  projectCategoriesContainer: React.ReactNode;
  projectCategoryToolbarCreateNewButton: React.ReactNode;
  projectToolbarActionsMenuTrigger: React.ReactNode;
}

export function ProjectCategoriesPage({
  projectCategoriesContainer,
  projectCategoryToolbarCreateNewButton,
  projectToolbarActionsMenuTrigger,
}: ProjectCategoriesPageProps) {
  const t = useTranslations("app.ProjectCategoriesPage");

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <SelectionProvider>
            <ToolbarDesktop>
              {projectToolbarActionsMenuTrigger}
              {projectCategoryToolbarCreateNewButton}
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              {projectToolbarActionsMenuTrigger}
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <div className="ml-auto">
                {projectCategoryToolbarCreateNewButton}
              </div>
            </ToolbarMobileBottom>

            {projectCategoriesContainer}
          </SelectionProvider>
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
