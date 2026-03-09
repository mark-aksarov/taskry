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
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { NewProjectCategoryModal } from "@/components/projectCategory/NewProjectCategoryModal";
import { ProjectCategoryToolbarActionsMenuTrigger } from "@/components/projectCategory/ProjectCategoryToolbarActionsMenuTrigger";
import { ProjectCategoryToolbarCreateNewModalTrigger } from "@/components/projectCategory/ProjectCategoryToolbarCreateNewModalTrigger";

interface ProjectCategoriesPageProps {
  totalCount: number;
  projectCategoriesContainer: React.ReactNode;
}

export function ProjectCategoriesPage({
  totalCount,
  projectCategoriesContainer,
}: ProjectCategoriesPageProps) {
  const t = useTranslations("app.ProjectCategoriesPage");

  if (totalCount === 0) {
    return (
      <>
        <EmptyPageContainer
          heading={t("emptySection.heading")}
          description={t("emptySection.description")}
          toolbarCreateNewMenuTrigger={
            <ProjectCategoryToolbarCreateNewModalTrigger />
          }
        />
        <NewProjectCategoryModal />
      </>
    );
  }

  return (
    <>
      <PageContainer>
        <PageGrid>
          <ViewModeProvider>
            <ToolbarDesktop>
              <ProjectCategoryToolbarActionsMenuTrigger />
              <ProjectCategoryToolbarCreateNewModalTrigger />
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <BackButton href="/projects" />
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              <ProjectCategoryToolbarActionsMenuTrigger />
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <div className="ml-auto">
                <ProjectCategoryToolbarCreateNewModalTrigger />
              </div>
            </ToolbarMobileBottom>

            {projectCategoriesContainer}
          </ViewModeProvider>
        </PageGrid>
      </PageContainer>

      <NewProjectCategoryModal />
    </>
  );
}
