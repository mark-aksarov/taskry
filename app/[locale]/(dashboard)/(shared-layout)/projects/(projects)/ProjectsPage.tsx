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
import { PageEmptySection } from "@/components/common/PageEmptySection";
import { NewProjectModal } from "@/components/projects/NewProjectModal";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { TaskToolbarManageMenuTrigger } from "@/components/tasks/TaskToolbarManageMenuTrigger";
import { NewProjectCategoryModal } from "@/components/projectCategory/NewProjectCategoryModal";
import { ProjectsFilteredEmptySection } from "@/components/projects/ProjectsFilteredEmptySection";
import { ProjectToolbarManageMenuTrigger } from "@/components/projects/ProjectToolbarManageMenuTrigger";
import { ProjectsEmptySectionCreateButton } from "@/components/projects/ProjectsEmptySectionCreateButton";
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
        <PageContainer fullscreen headerOffset>
          <PageGrid className="relative flex-auto">
            <ToolbarDesktop>
              <TaskToolbarManageMenuTrigger />
            </ToolbarDesktop>
            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              <div className="ml-auto">
                <TaskToolbarManageMenuTrigger />
              </div>
            </ToolbarMobileTop>

            <PageEmptySection
              heading={t("emptySection.heading")}
              description={t("emptySection.description")}
              createButton={<ProjectsEmptySectionCreateButton />}
            />
          </PageGrid>
        </PageContainer>

        <NewProjectModal newProjectFormContainer={newProjectFormContainer} />
      </>
    );
  }

  const isFilteredEmpty = totalFilteredProjects === 0;

  return (
    <>
      <PageContainer fullscreen={isFilteredEmpty} headerOffset>
        <PageGrid className="relative flex-auto">
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

            {isFilteredEmpty ? (
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
