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
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { PageEmptySection } from "@/components/common/PageEmptySection";
import { NewProjectCategoryModal } from "@/components/projectCategory/NewProjectCategoryModal";
import { ProjectCategoryToolbarActionsMenuTrigger } from "@/components/projectCategory/ProjectCategoryToolbarActionsMenuTrigger";
import { ProjectCategoriesEmptySectionCreateButton } from "@/components/projectCategory/ProjectCategoriesEmptySectionCreateButton";
import { ProjectCategoryToolbarCreateNewModalTrigger } from "@/components/projectCategory/ProjectCategoryToolbarCreateNewModalTrigger";

interface ProjectCategoriesPageProps {
  totalCount: number;
  searchContainer: React.ReactNode;
  projectCategoriesContainer: React.ReactNode;
}

export function ProjectCategoriesPage({
  totalCount,
  searchContainer,
  projectCategoriesContainer,
}: ProjectCategoriesPageProps) {
  const t = useTranslations("app.ProjectCategoriesPage");

  if (totalCount === 0) {
    return (
      <>
        <PageContainer fullscreen headerOffset>
          <PageGrid className="relative flex-auto">
            <ToolbarMobileTop>
              <BackButton href="/customers" />
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            </ToolbarMobileTop>

            <PageEmptySection
              heading={t("emptySection.heading")}
              description={t("emptySection.description")}
              createButton={<ProjectCategoriesEmptySectionCreateButton />}
            />
          </PageGrid>
        </PageContainer>

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

      <TaskSearchModal searchContainer={searchContainer} />
      <NewProjectCategoryModal />
    </>
  );
}
