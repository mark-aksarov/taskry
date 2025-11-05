import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";

import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionButton,
} from "@/components/common/EmptySection";
import { PageGrid } from "@/components/common/PageGrid";
import {
  ViewModeContainer,
  ViewModeToggleButtonGroup,
} from "@/components/common/ViewMode";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { FiltersModalTrigger } from "@/components/common/FiltersModalTrigger";
import { FiltersBottomSheetTrigger } from "@/components/common/FiltersBottomSheetTrigger";
import { ProjectFiltersForm } from "@/components/projects/ProjectFiltersForm";
import { ProjectCategoryCheckboxGroup } from "@/components/projects/ProjectCategoryCheckboxGroup";
import { CustomerCheckboxGroup } from "@/components/customer/CustomerCheckboxGroup";
import { ProjectActionsMenuTrigger } from "@/components/projects/ProjectActionsMenuTrigger";
import { ProjectList } from "@/components/projects/ProjectList";
import { getProjectCategories, getProjects } from "@/lib/queries/project";
import { getCustomers } from "@/lib/queries/customers";
import { getUsers } from "@/lib/queries/user";
import { UserCheckboxGroup } from "@/components/users/UserCheckboxGroup";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { FiltersFormSkeleton } from "@/components/common/FiltersFormSkeleton";
import { PageContainer } from "@/components/common/PageContainer";

export default async function ProjectsPage() {
  const categoriesPromise = getProjectCategories(1);
  const customersPromise = getCustomers(1);
  const usersPromise = getUsers(1);
  const projects = await getProjects();

  const projectFiltersForm = (
    <ProjectFiltersForm
      projectCategoryCheckboxGroup={
        <ProjectCategoryCheckboxGroup categoriesPromise={categoriesPromise} />
      }
      customerCheckboxGroup={
        <CustomerCheckboxGroup customersPromise={customersPromise} />
      }
      userCheckboxGroup={<UserCheckboxGroup usersPromise={usersPromise} />}
    />
  );

  if (!projects.length) {
    return (
      <PageContainer fullscreen centered>
        <EmptySection>
          <EmptySectionHeading>No projects yet</EmptySectionHeading>
          <EmptySectionDescription>
            Create a new project to keep track of your work
          </EmptySectionDescription>
          <EmptySectionButton href="#">New Project</EmptySectionButton>
        </EmptySection>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <FiltersModalTrigger
              filtersForm={
                <Suspense fallback={<FiltersFormSkeleton />}>
                  {projectFiltersForm}
                </Suspense>
              }
            />
            <ProjectActionsMenuTrigger />
            <ViewModeToggleButtonGroup className="ml-auto" />
            <Button
              label="New Project"
              iconLeft={
                <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
              }
            />
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <ToolbarMobileHeading>Projects</ToolbarMobileHeading>
            <FiltersBottomSheetTrigger
              filtersForm={
                <Suspense fallback={<FiltersFormSkeleton />}>
                  {projectFiltersForm}
                </Suspense>
              }
            />
            <ProjectActionsMenuTrigger />
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ViewModeToggleButtonGroup />
            <Button
              label="New Project"
              iconLeft={
                <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
              }
            />
          </ToolbarMobileBottom>
          <ViewModeContainer
            list={<ProjectList projects={projects} />}
            grid={<ProjectGrid projects={projects} />}
          />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
