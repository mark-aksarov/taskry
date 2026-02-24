import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { ProjectSortField } from "@/lib/types";
import { PageGrid } from "@/components/common/PageGrid";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { ProjectsFilteredEmptySection } from "@/components/projects/ProjectsFilteredEmptySection";
import { ProjectToolbarManageMenuTrigger } from "@/components/projects/ProjectToolbarManageMenuTrigger";
import { ProjectToolbarActionsMenuTrigger } from "@/components/projects/ProjectToolbarActionsMenuTrigger";
import { ProjectToolbarSortingMenuTrigger } from "@/components/projects/ProjectToolbarSortingMenuTrigger";
import { ProjectToolbarFiltersModalTrigger } from "@/components/projects/ProjectToolbarFiltersModalTrigger";
import { ProjectToolbarCreateNewMenuTrigger } from "@/components/projects/ProjectToolbarCreateNewMenuTrigger";

interface ProjectsPageProps {
  guestMode: boolean;
  totalFilteredProjects: number;
  projectsContainer: React.ReactNode;
  newProjectFormContainer: React.ReactNode;
  createProjectCategory: ActionFn<ActionState, FormData>;
  projectFiltersFormContainer: React.ReactNode;
  deleteProjects: ActionFn<ActionState, number[]>;
  selectedSortField: ProjectSortField;
}

export function ProjectsPage({
  guestMode,
  totalFilteredProjects,
  projectsContainer,
  newProjectFormContainer,
  createProjectCategory,
  projectFiltersFormContainer,
  deleteProjects,
  selectedSortField,
}: ProjectsPageProps) {
  const t = useTranslations("app.ProjectsPage");

  const projectToolbarCreateNewMenuTrigger = (
    <ProjectToolbarCreateNewMenuTrigger
      guestMode={guestMode}
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
      guestMode={guestMode}
      deleteProjects={deleteProjects}
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
