import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import {
  ToolbarDesktop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarMobileTop,
} from "@/components/common/Toolbar";
import { ProjectFiltersForm } from "@/components/projects/ProjectFiltersForm";
import { FiltersModalTrigger } from "@/components/common/FiltersModalTrigger";
import { FiltersBottomSheetTrigger } from "@/components/common/FiltersBottomSheetTrigger";
import { ProjectActionsMenuTrigger } from "@/components/projects/ProjectActionsMenuTrigger";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { UserCheckboxGroupSkeleton } from "@/components/users/UserCheckboxGroup";
import { CustomerCheckboxGroupSkeleton } from "@/components/customer/CustomerCheckboxGroup";
import { ProjectCategoryCheckboxGroupSkeleton } from "@/components/projects/ProjectCategoryCheckboxGroup";

interface ProjectsPageProps {
  ProjectCategoryCheckboxGroupContainer: React.ComponentType;
  CustomerCheckboxGroupContainer: React.ComponentType;
  UserCheckboxGroupContainer: React.ComponentType;
  ProjectViewModeContainer: React.ComponentType;
}

export function ProjectsPage({
  ProjectCategoryCheckboxGroupContainer,
  CustomerCheckboxGroupContainer,
  UserCheckboxGroupContainer,
  ProjectViewModeContainer,
}: ProjectsPageProps) {
  const projectFiltersForm = (
    <ProjectFiltersForm
      projectCategoryCheckboxGroup={
        <Suspense fallback={<ProjectCategoryCheckboxGroupSkeleton />}>
          <ProjectCategoryCheckboxGroupContainer />
        </Suspense>
      }
      customerCheckboxGroup={
        <Suspense fallback={<CustomerCheckboxGroupSkeleton />}>
          <CustomerCheckboxGroupContainer />
        </Suspense>
      }
      userCheckboxGroup={
        <Suspense fallback={<UserCheckboxGroupSkeleton />}>
          <UserCheckboxGroupContainer />
        </Suspense>
      }
    />
  );

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <FiltersModalTrigger filtersForm={projectFiltersForm} />
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
            <FiltersBottomSheetTrigger filtersForm={projectFiltersForm} />
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
          <ProjectViewModeContainer />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
