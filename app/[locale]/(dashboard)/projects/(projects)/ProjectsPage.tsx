import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";
import { Suspense } from "react";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { NewProjectFormSkeleton } from "@/components/projects/NewProjectForm";
import { ProjectFiltersFormSkeleton } from "@/components/projects/ProjectFiltersForm";
import { ProjectToolbarSortingMenuTrigger } from "@/components/projects/ProjectToolbarSortingMenuTrigger";
import { ProjectToolbarActionsMenuTrigger } from "@/components/projects/ProjectToolbarActionsMenuTrigger";
import { ProjectToolbarFiltersModalTrigger } from "@/components/projects/ProjectToolbarFiltersModalTrigger";
import { ProjectToolbarCreateNewMenuTrigger } from "@/components/projects/ProjectToolbarCreateNewMenuTrigger";

interface ProjectsPageProps {
  ProjectFiltersFormContainer: React.ComponentType;
  NewProjectFormContainer: React.ComponentType;
  ProjectsServerContainer: React.ComponentType;
}

export function ProjectsPage({
  ProjectFiltersFormContainer,
  NewProjectFormContainer,
  ProjectsServerContainer,
}: ProjectsPageProps) {
  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <ProjectToolbarSortingMenuTrigger />
            <ProjectToolbarFiltersModalTrigger
              filtersForm={
                <Suspense fallback={<ProjectFiltersFormSkeleton />}>
                  <ProjectFiltersFormContainer />
                </Suspense>
              }
            />
            <ProjectToolbarActionsMenuTrigger />
            <ViewModeToggleButtonGroup className="ml-auto" />
            <ProjectToolbarCreateNewMenuTrigger
              newProjectForm={
                <Suspense fallback={<NewProjectFormSkeleton />}>
                  <NewProjectFormContainer />
                </Suspense>
              }
              newProjectCategoryForm={<></>}
            />
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <ToolbarMobileHeading>Projects</ToolbarMobileHeading>
            <ProjectToolbarSortingMenuTrigger />
            <ProjectToolbarFiltersModalTrigger
              filtersForm={
                <Suspense fallback={<ProjectFiltersFormSkeleton />}>
                  <ProjectFiltersFormContainer />
                </Suspense>
              }
            />
            <ProjectToolbarActionsMenuTrigger />
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ViewModeToggleButtonGroup />
            <ProjectToolbarCreateNewMenuTrigger
              newProjectForm={
                <Suspense fallback={<NewProjectFormSkeleton />}>
                  <NewProjectFormContainer />
                </Suspense>
              }
              newProjectCategoryForm={<></>}
            />
          </ToolbarMobileBottom>
          <ProjectsServerContainer />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
