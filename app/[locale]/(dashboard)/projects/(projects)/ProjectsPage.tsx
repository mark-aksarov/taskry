import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { ProjectSortField } from "@/lib/types";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { NewProjectModal } from "@/components/projects/NewProjectModal";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { NewProjectCategoryModal } from "@/components/projectCategory/NewProjectCategoryModal";
import { ProjectsFilteredEmptySection } from "@/components/projects/ProjectsFilteredEmptySection";
import { ProjectToolbarManageMenuTrigger } from "@/components/projects/ProjectToolbarManageMenuTrigger";
import { ProjectToolbarActionsMenuTrigger } from "@/components/projects/ProjectToolbarActionsMenuTrigger";
import { ProjectToolbarSortingMenuTrigger } from "@/components/projects/ProjectToolbarSortingMenuTrigger";
import { ProjectToolbarFiltersModalTrigger } from "@/components/projects/ProjectToolbarFiltersModalTrigger";
import { ProjectToolbarCreateNewMenuTrigger } from "@/components/projects/ProjectToolbarCreateNewMenuTrigger";

interface ProjectsPageProps {
  totalCount: number;
  totalFilteredProjects: number;
  selectedSortField: ProjectSortField;
  projectsContainer: React.ReactNode;
  newProjectFormContainer: React.ReactNode;
  projectFiltersFormContainer: React.ReactNode;
}

export function ProjectsPage({
  totalCount,
  totalFilteredProjects,
  selectedSortField,
  projectsContainer,
  newProjectFormContainer,
  projectFiltersFormContainer,
}: ProjectsPageProps) {
  const t = useTranslations("app.ProjectsPage");

  if (totalCount === 0) {
    return (
      <>
        <EmptyPageContainer
          heading={t("emptySection.heading")}
          description={t("emptySection.description")}
          toolbarCreateNewMenuTrigger={<ProjectToolbarCreateNewMenuTrigger />}
          toolbarManageMenuTrigger={<ProjectToolbarManageMenuTrigger />}
        />

        <NewProjectModal newProjectFormContainer={newProjectFormContainer} />
        <NewProjectCategoryModal />
      </>
    );
  }

  return (
    <>
      <PageContainer
        fullscreen={totalFilteredProjects === 0}
        className="relative"
      >
        <PageGrid className="flex-auto">
          <ViewModeProvider>
            <ToolbarDesktop>
              <ProjectToolbarManageMenuTrigger />
              <ProjectToolbarSortingMenuTrigger
                selectedSortField={selectedSortField}
              />
              <ProjectToolbarFiltersModalTrigger
                filtersFormContainer={projectFiltersFormContainer}
              />
              <ProjectToolbarActionsMenuTrigger />
              <ViewModeToggleButtonGroup className="ml-auto" />
              <ProjectToolbarCreateNewMenuTrigger />
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              <ProjectToolbarManageMenuTrigger />
              <ProjectToolbarSortingMenuTrigger
                selectedSortField={selectedSortField}
              />
              <ProjectToolbarFiltersModalTrigger
                filtersFormContainer={projectFiltersFormContainer}
              />
              <ProjectToolbarActionsMenuTrigger />
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <ViewModeToggleButtonGroup />
              <ProjectToolbarCreateNewMenuTrigger />
            </ToolbarMobileBottom>

            {totalFilteredProjects === 0 ? (
              <ProjectsFilteredEmptySection />
            ) : (
              projectsContainer
            )}
          </ViewModeProvider>
        </PageGrid>
      </PageContainer>

      <NewProjectModal newProjectFormContainer={newProjectFormContainer} />
      <NewProjectCategoryModal />
    </>
  );
}
