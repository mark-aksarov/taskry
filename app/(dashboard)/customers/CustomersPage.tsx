import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
  ToolbarCreateNewMenuTrigger,
} from "@/components/common/Toolbar";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskFormBaseSkeleton } from "@/components/tasks/TaskFormBase";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { NewProjectFormSkeleton } from "@/components/projects/NewProjectForm";
import { CustomerFiltersFormSkeleton } from "@/components/customer/CustomerFiltersForm";
import { CustomerToolbarActionsMenuTrigger } from "@/components/customer/CustomerToolbarActionsMenuTrigger";
import { CustomerToolbarFiltersModalTrigger } from "@/components/customer/CustomerToolbarFiltersModalTrigger";
import { CustomerToolbarFiltersBottomSheetTrigger } from "@/components/customer/CustomerToolbarFiltersBottomSheetTrigger";

interface CustomersPageProps {
  CustomerFiltersFormContainer: React.ComponentType;
  NewTaskFormContainer: React.ComponentType;
  NewProjectFormContainer: React.ComponentType;
  CustomersServerContainer: React.ComponentType;
}

export async function CustomersPage({
  CustomerFiltersFormContainer,
  NewTaskFormContainer,
  NewProjectFormContainer,
  CustomersServerContainer,
}: CustomersPageProps) {
  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            <CustomerToolbarFiltersModalTrigger
              filtersForm={
                <Suspense fallback={<CustomerFiltersFormSkeleton />}>
                  <CustomerFiltersFormContainer />
                </Suspense>
              }
            />
            <CustomerToolbarActionsMenuTrigger />
            <ViewModeToggleButtonGroup className="ml-auto" />
            <ToolbarCreateNewMenuTrigger
              newTaskForm={
                <Suspense fallback={<TaskFormBaseSkeleton />}>
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
            <ToolbarMobileHeading>Customers</ToolbarMobileHeading>
            <CustomerToolbarFiltersBottomSheetTrigger
              filtersForm={
                <Suspense fallback={<CustomerFiltersFormSkeleton />}>
                  <CustomerFiltersFormContainer />
                </Suspense>
              }
            />
            <CustomerToolbarActionsMenuTrigger />
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ViewModeToggleButtonGroup />
            <ToolbarCreateNewMenuTrigger
              newTaskForm={
                <Suspense fallback={<TaskFormBaseSkeleton />}>
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
          <CustomersServerContainer />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
