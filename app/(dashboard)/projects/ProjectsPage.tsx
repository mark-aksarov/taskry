import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { PageGrid } from "@/components/common/PageGrid";
import { Button, RACDialogTrigger } from "@/components/ui";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { NewProjectModal } from "@/components/projects/NewProjectModal";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { NewProjectFormSkeleton } from "@/components/projects/NewProjectForm";
import { ProjectFiltersFormSkeleton } from "@/components/projects/ProjectFiltersForm";
import { ProjectToolbarSortingMenuTrigger } from "@/components/projects/ProjectToolbarSortingMenuTrigger";
import { ProjectToolbarActionsMenuTrigger } from "@/components/projects/ProjectToolbarActionsMenuTrigger";
import { ProjectToolbarFiltersModalTrigger } from "@/components/projects/ProjectToolbarFiltersModalTrigger";
import { ProjectToolbarFiltersBottomSheetTrigger } from "@/components/projects/ProjectToolbarFiltersBottomSheetTrigger";

interface ProjectsPageProps {
  ProjectFiltersFormContainer: React.ComponentType;
  NewProjectFormContainer: React.ComponentType;
  ProjectViewModeContainer: React.ComponentType;
}

export function ProjectsPage({
  ProjectFiltersFormContainer,
  NewProjectFormContainer,
  ProjectViewModeContainer,
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
            <RACDialogTrigger>
              <Button
                label="New Project"
                iconLeft={
                  <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
                }
              />
              <NewProjectModal
                newProjectForm={
                  <Suspense fallback={<NewProjectFormSkeleton />}>
                    <NewProjectFormContainer />
                  </Suspense>
                }
              />
            </RACDialogTrigger>
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
            <NewProjectModal
              newProjectForm={
                <Suspense fallback={<NewProjectFormSkeleton />}>
                  <NewProjectFormContainer />
                </Suspense>
              }
            />
          </ToolbarMobileBottom>
          <ProjectViewModeContainer />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
