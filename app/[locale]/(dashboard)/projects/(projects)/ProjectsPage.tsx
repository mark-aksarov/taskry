import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { ProjectFilters } from "@/lib/types";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { SelectionProvider } from "@/components/common/SelectionContext";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { ProjectFormBaseSkeleton } from "@/components/projects/ProjectFormBase";
import { NewProjectCategoryForm } from "@/components/projects/NewProjectCategoryForm";
import { ProjectFiltersFormSkeleton } from "@/components/projects/ProjectFiltersForm";
import { ProjectToolbarSortingMenuTrigger } from "@/components/projects/ProjectToolbarSortingMenuTrigger";
import { ProjectToolbarActionsMenuTrigger } from "@/components/projects/ProjectToolbarActionsMenuTrigger";
import { ProjectToolbarFiltersModalTrigger } from "@/components/projects/ProjectToolbarFiltersModalTrigger";
import { ProjectToolbarCreateNewMenuTrigger } from "@/components/projects/ProjectToolbarCreateNewMenuTrigger";

interface ProjectsPageProps {
  page: number;
  pageSize: number;
  sort: string;
  filters: ProjectFilters;
  createProjectCategoryAction: ActionFn<ActionState, FormData>;
  deleteProjectsAction: ActionFn<ActionState, DeleteProjectsPayload>;
  updateProjectStatusesAction: ActionFn<
    ActionState,
    UpdateProjectStatusesPayload
  >;
  ProjectFiltersFormContainer: React.ComponentType<{
    filters: ProjectFilters;
  }>;
  NewProjectFormContainer: React.ComponentType;
  ProjectsServerContainer: React.ComponentType<{
    page: number;
    pageSize: number;
    sort: string;
    filters?: ProjectFilters;
  }>;
}

export function ProjectsPage({
  page,
  pageSize,
  sort,
  filters,
  createProjectCategoryAction,
  deleteProjectsAction,
  updateProjectStatusesAction,
  ProjectFiltersFormContainer,
  NewProjectFormContainer,
  ProjectsServerContainer,
}: ProjectsPageProps) {
  const t = useTranslations("app.ProjectsPage");

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <SelectionProvider>
            <ToolbarDesktop>
              <ProjectToolbarSortingMenuTrigger />
              <ProjectToolbarFiltersModalTrigger
                filtersForm={
                  <Suspense fallback={<ProjectFiltersFormSkeleton />}>
                    <ProjectFiltersFormContainer filters={filters} />
                  </Suspense>
                }
              />
              <ProjectToolbarActionsMenuTrigger
                deleteAction={deleteProjectsAction}
                updateStatusAction={updateProjectStatusesAction}
              />
              <ViewModeToggleButtonGroup className="ml-auto" />
              <ProjectToolbarCreateNewMenuTrigger
                newProjectForm={
                  <Suspense fallback={<ProjectFormBaseSkeleton />}>
                    <NewProjectFormContainer />
                  </Suspense>
                }
                newProjectCategoryForm={
                  <NewProjectCategoryForm
                    formAction={createProjectCategoryAction}
                  />
                }
              />
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              <ProjectToolbarSortingMenuTrigger />
              <ProjectToolbarFiltersModalTrigger
                filtersForm={
                  <Suspense fallback={<ProjectFiltersFormSkeleton />}>
                    <ProjectFiltersFormContainer filters={filters} />
                  </Suspense>
                }
              />
              <ProjectToolbarActionsMenuTrigger
                deleteAction={deleteProjectsAction}
                updateStatusAction={updateProjectStatusesAction}
              />
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <ViewModeToggleButtonGroup />
              <ProjectToolbarCreateNewMenuTrigger
                newProjectForm={
                  <Suspense fallback={<ProjectFormBaseSkeleton />}>
                    <NewProjectFormContainer />
                  </Suspense>
                }
                newProjectCategoryForm={
                  <NewProjectCategoryForm
                    formAction={createProjectCategoryAction}
                  />
                }
              />
            </ToolbarMobileBottom>

            <ProjectsServerContainer
              page={page}
              pageSize={pageSize}
              sort={sort}
              filters={filters}
            />
          </SelectionProvider>
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
