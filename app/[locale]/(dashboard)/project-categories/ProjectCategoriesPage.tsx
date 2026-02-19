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

interface ProjectCategoriesPageProps {
  projectCategoriesContainer: React.ReactNode;
  projectCategoryToolbarCreateNewModalTrigger: React.ReactNode;
  projectCategoryToolbarActionsMenuTrigger: React.ReactNode;
}

export function ProjectCategoriesPage({
  projectCategoriesContainer,
  projectCategoryToolbarCreateNewModalTrigger,
  projectCategoryToolbarActionsMenuTrigger,
}: ProjectCategoriesPageProps) {
  const t = useTranslations("app.ProjectCategoriesPage");

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            {projectCategoryToolbarActionsMenuTrigger}
            {projectCategoryToolbarCreateNewModalTrigger}
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <BackButton />
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            {projectCategoryToolbarActionsMenuTrigger}
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <div className="ml-auto">
              {projectCategoryToolbarCreateNewModalTrigger}
            </div>
          </ToolbarMobileBottom>

          {projectCategoriesContainer}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
