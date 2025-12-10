import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
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
  page: number;
  pageSize: number;
  ProjectFiltersFormContainer: React.ComponentType;
  NewProjectFormContainer: React.ComponentType;
  ProjectsServerContainer: React.ComponentType<{
    page: number;
    pageSize: number;
  }>;
}

export function ProjectsPage({
  page,
  pageSize,
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
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
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

          <ProjectsServerContainer page={page} pageSize={pageSize} />
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
