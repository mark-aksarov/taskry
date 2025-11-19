import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarCreateNewMenuTrigger,
} from "@/components/common/Toolbar";
import { Suspense } from "react";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { NewTaskFormSkeleton } from "@/components/tasks/NewTaskForm";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { NewProjectFormSkeleton } from "@/components/projects/NewProjectForm";
import { ProjectFiltersFormSkeleton } from "@/components/projects/ProjectFiltersForm";
import { ProjectToolbarSortingMenuTrigger } from "@/components/projects/ProjectToolbarSortingMenuTrigger";
import { ProjectToolbarActionsMenuTrigger } from "@/components/projects/ProjectToolbarActionsMenuTrigger";
import { ProjectToolbarFiltersModalTrigger } from "@/components/projects/ProjectToolbarFiltersModalTrigger";
import { ProjectToolbarFiltersBottomSheetTrigger } from "@/components/projects/ProjectToolbarFiltersBottomSheetTrigger";

interface ProjectsPageProps {
  ProjectFiltersFormContainer: React.ComponentType;
  NewTaskFormContainer: React.ComponentType;
  NewProjectFormContainer: React.ComponentType;
  ProjectsServerContainer: React.ComponentType;
}

export function ProjectsPage({
  ProjectFiltersFormContainer,
  NewTaskFormContainer,
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
            <ToolbarCreateNewMenuTrigger
              newTaskForm={
                <Suspense fallback={<NewTaskFormSkeleton />}>
                  <NewTaskFormContainer />
                </Suspense>
              }
              newProjectForm={
                <Suspense fallback={<NewProjectFormSkeleton />}>
                  <NewProjectFormContainer />
                </Suspense>
              }
            />
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <ToolbarMobileHeading>Projects</ToolbarMobileHeading>
            <ProjectToolbarSortingMenuTrigger />
            <ProjectToolbarFiltersBottomSheetTrigger
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
            <ToolbarCreateNewMenuTrigger
              newTaskForm={
                <Suspense fallback={<NewTaskFormSkeleton />}>
                  <NewTaskFormContainer />
                </Suspense>
              }
              newProjectForm={
                <Suspense fallback={<NewProjectFormSkeleton />}>
                  <NewProjectFormContainer />
                </Suspense>
              }
            />
          </ToolbarMobileBottom>
          <ProjectsServerContainer />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
