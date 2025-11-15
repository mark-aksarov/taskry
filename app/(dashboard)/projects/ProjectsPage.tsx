import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Button, RACDialogTrigger } from "@/components/ui";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { FiltersModalTrigger } from "@/components/common/FiltersModalTrigger";
import { FiltersBottomSheetTrigger } from "@/components/common/FiltersBottomSheetTrigger";
import { ProjectActionsMenuTrigger } from "@/components/projects/ProjectActionsMenuTrigger";
import {
  ProjectFiltersForm,
  ProjectFiltersFormSkeleton,
} from "@/components/projects/ProjectFiltersForm";
import { NewProjectFormSkeleton } from "@/components/projects/NewProjectForm";
import { NewProjectModal } from "@/components/projects/NewProjectModal";

interface ProjectsPageProps {
  ProjectCategoryCheckboxGroupContainer: React.ComponentType;
  CustomerCheckboxGroupContainer: React.ComponentType;
  UserCheckboxGroupContainer: React.ComponentType;
  NewProjectFormContainer: React.ComponentType;
  ProjectViewModeContainer: React.ComponentType;
}

export function ProjectsPage({
  ProjectCategoryCheckboxGroupContainer,
  CustomerCheckboxGroupContainer,
  UserCheckboxGroupContainer,
  NewProjectFormContainer,
  ProjectViewModeContainer,
}: ProjectsPageProps) {
  const projectFiltersForm = (
    <Suspense fallback={<ProjectFiltersFormSkeleton />}>
      <ProjectFiltersForm
        projectCategoryCheckboxGroup={<ProjectCategoryCheckboxGroupContainer />}
        customerCheckboxGroup={<CustomerCheckboxGroupContainer />}
        userCheckboxGroup={<UserCheckboxGroupContainer />}
      />
    </Suspense>
  );

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <FiltersModalTrigger filtersForm={projectFiltersForm} />
            <ProjectActionsMenuTrigger />
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
            <FiltersBottomSheetTrigger filtersForm={projectFiltersForm} />
            <ProjectActionsMenuTrigger />
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
