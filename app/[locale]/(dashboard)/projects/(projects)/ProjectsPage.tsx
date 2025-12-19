import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ProjectFiltersType } from "@/lib/types/projects";
import { deleteProjects } from "@/lib/actions/deleteProjects";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { updateProjectStatuses } from "@/lib/actions/updateProjectStatuses";
import { NewProjectFormSkeleton } from "@/components/projects/NewProjectForm";
import { ProjectFiltersFormSkeleton } from "@/components/projects/ProjectFiltersForm";
import { ProjectToolbarSortingMenuTrigger } from "@/components/projects/ProjectToolbarSortingMenuTrigger";
import { ProjectToolbarActionsMenuTrigger } from "@/components/projects/ProjectToolbarActionsMenuTrigger";
import { ProjectToolbarFiltersModalTrigger } from "@/components/projects/ProjectToolbarFiltersModalTrigger";
import { ProjectToolbarCreateNewMenuTrigger } from "@/components/projects/ProjectToolbarCreateNewMenuTrigger";

interface ProjectsPageProps {
  page: number;
  pageSize: number;
  sort: string;
  filters?: ProjectFiltersType;
  ProjectFiltersFormContainer: React.ComponentType;
  NewProjectFormContainer: React.ComponentType;
  ProjectsServerContainer: React.ComponentType<{
    page: number;
    pageSize: number;
    sort: string;
    filters?: ProjectFiltersType;
  }>;
}

export function ProjectsPage({
  page,
  pageSize,
  sort,
  filters,
  ProjectFiltersFormContainer,
  NewProjectFormContainer,
  ProjectsServerContainer,
}: ProjectsPageProps) {
  const t = useTranslations("app.ProjectsPage");

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
            <ProjectToolbarActionsMenuTrigger
              deleteAction={deleteProjects}
              updateStatusAction={updateProjectStatuses}
            />
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
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            <ProjectToolbarSortingMenuTrigger />
            <ProjectToolbarFiltersModalTrigger
              filtersForm={
                <Suspense fallback={<ProjectFiltersFormSkeleton />}>
                  <ProjectFiltersFormContainer />
                </Suspense>
              }
            />
            <ProjectToolbarActionsMenuTrigger
              deleteAction={deleteProjects}
              updateStatusAction={updateProjectStatuses}
            />
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

          <ProjectsServerContainer
            page={page}
            pageSize={pageSize}
            sort={sort}
            filters={filters}
          />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
