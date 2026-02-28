import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
} from "@/lib/actions/types";

import { useTranslations } from "next-intl";
import { ProjectSortField } from "@/lib/types";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { updateProjectStatuses } from "@/lib/actions/project/updateProjectStatuses";
import { ProjectsFilteredEmptySection } from "@/components/projects/ProjectsFilteredEmptySection";
import { ProjectToolbarManageMenuTrigger } from "@/components/projects/ProjectToolbarManageMenuTrigger";
import { ProjectToolbarActionsMenuTrigger } from "@/components/projects/ProjectToolbarActionsMenuTrigger";
import { ProjectToolbarSortingMenuTrigger } from "@/components/projects/ProjectToolbarSortingMenuTrigger";
import { ProjectToolbarFiltersModalTrigger } from "@/components/projects/ProjectToolbarFiltersModalTrigger";
import { ProjectToolbarCreateNewMenuTrigger } from "@/components/projects/ProjectToolbarCreateNewMenuTrigger";

interface ProjectsPageProps {
  totalFilteredProjects: number;
  selectedSortField: ProjectSortField;
  projectsContainer: React.ReactNode;
  newProjectFormContainer: React.ReactNode;
  projectFiltersFormContainer: React.ReactNode;
  createProjectCategory: ActionFn<ActionState, FormData>;
  deleteProjects: ActionFn<ActionState, DeleteProjectsPayload>;
}

export function ProjectsPage({
  totalFilteredProjects,
  selectedSortField,
  projectsContainer,
  newProjectFormContainer,
  projectFiltersFormContainer,
  createProjectCategory,
  deleteProjects,
}: ProjectsPageProps) {
  const t = useTranslations("app.ProjectsPage");

  const projectToolbarCreateNewMenuTrigger = (
    <ProjectToolbarCreateNewMenuTrigger
      newProjectFormContainer={newProjectFormContainer}
      createProjectCategory={createProjectCategory}
    />
  );

  const projectToolbarFiltersModalTrigger = (
    <ProjectToolbarFiltersModalTrigger
      filtersFormContainer={projectFiltersFormContainer}
    />
  );

  const projectToolbarActionsMenuTrigger = (
    <ProjectToolbarActionsMenuTrigger
      deleteProjects={deleteProjects}
      updateProjectStatuses={updateProjectStatuses}
    />
  );

  return (
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
            {projectToolbarFiltersModalTrigger}
            {projectToolbarActionsMenuTrigger}
            <ViewModeToggleButtonGroup className="ml-auto" />
            {projectToolbarCreateNewMenuTrigger}
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            <ProjectToolbarManageMenuTrigger />
            <ProjectToolbarSortingMenuTrigger
              selectedSortField={selectedSortField}
            />
            {projectToolbarFiltersModalTrigger}
            {projectToolbarActionsMenuTrigger}
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ViewModeToggleButtonGroup />
            {projectToolbarCreateNewMenuTrigger}
          </ToolbarMobileBottom>

          {totalFilteredProjects === 0 ? (
            <ProjectsFilteredEmptySection />
          ) : (
            projectsContainer
          )}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
