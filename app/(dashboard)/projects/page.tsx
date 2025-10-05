import { FiltersSideSheetTrigger } from "@/components/common/FiltersSideSheetTrigger";
import { ToolbarDesktop } from "@/components/common/ToolbarDesktop";
import { ProjectFiltersFormSkeleton } from "@/components/projects/ProjectFiltersForm";
import { ProjectFiltersForm } from "@/components/projects/ProjectFiltersForm";
import { getProjectCategories, getProjects } from "@/lib/queries/project";
import { ProjectCategoryCheckboxGroup } from "@/components/projects/ProjectCategoryCheckboxGroup";
import { getCustomers } from "@/lib/queries/customers";
import { CustomerCheckboxGroup } from "@/components/customer/CustomerCheckboxGroup";
import { getUsers } from "@/lib/queries/user";
import { UserCheckboxGroup } from "@/components/users/UserCheckboxGroup";
import { Suspense } from "react";
import { ProjectActionsMenuTrigger } from "@/components/projects/ProjectActionsMenuTrigger";
import { ViewToggle } from "@/components/common/ViewToggle";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { ToolbarMobileTop } from "@/components/common/ToolbarMobileTop";
import { ToolbarMobileHeading } from "@/components/common/ToolbarMobileHeading";
import { FiltersBottomSheetTrigger } from "@/components/common/FiltersBottomSheetTrigger";
import { ToolbarMobileBottom } from "@/components/common/ToolbarMobileBottom";
import { ProjectList } from "@/components/projects/ProjectList";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionLink,
  EmptySectionHeading,
} from "@/components/common/EmptySection";
import { PageGrid } from "@/components/common/PageGrid";
import { PageCentered } from "@/components/common/PageCentered";

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
      <PageCentered>
        <EmptySection>
          <EmptySectionHeading>No projects yet</EmptySectionHeading>
          <EmptySectionDescription>
            Create a new project to keep track of your work
          </EmptySectionDescription>
          <EmptySectionLink href="#">New Project</EmptySectionLink>
        </EmptySection>
      </PageCentered>
    );
  }

  return (
    <PageGrid>
      <ToolbarDesktop>
        <FiltersSideSheetTrigger
          filtersForm={
            <Suspense fallback={<ProjectFiltersFormSkeleton />}>
              {projectFiltersForm}
            </Suspense>
          }
        />
        <ProjectActionsMenuTrigger />
        <ViewToggle className="ml-auto" />
        <Button
          label="New Project"
          iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        />
      </ToolbarDesktop>

      <ToolbarMobileTop>
        <ToolbarMobileHeading>Projects</ToolbarMobileHeading>
        <FiltersBottomSheetTrigger
          filtersForm={
            <Suspense fallback={<ProjectFiltersFormSkeleton />}>
              {projectFiltersForm}
            </Suspense>
          }
        />
        <ProjectActionsMenuTrigger />
      </ToolbarMobileTop>

      <ToolbarMobileBottom>
        <ViewToggle />
        <Button
          label="New Project"
          iconLeft={<Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        />
      </ToolbarMobileBottom>

      <ProjectList projects={projects} />
    </PageGrid>
  );
}
