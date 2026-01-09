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

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { SelectionProvider } from "@/components/common/SelectionContext";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { NewProjectCategoryForm } from "@/components/projects/NewProjectCategoryForm";
import { ProjectToolbarSortingMenuTrigger } from "@/components/projects/ProjectToolbarSortingMenuTrigger";
import { ProjectToolbarActionsMenuTrigger } from "@/components/projects/ProjectToolbarActionsMenuTrigger";
import { ProjectToolbarFiltersModalTrigger } from "@/components/projects/ProjectToolbarFiltersModalTrigger";
import { ProjectToolbarCreateNewMenuTrigger } from "@/components/projects/ProjectToolbarCreateNewMenuTrigger";

interface ProjectsPageProps {
  createProjectCategoryAction: ActionFn<ActionState, FormData>;
  deleteProjectsAction: ActionFn<ActionState, DeleteProjectsPayload>;
  updateProjectStatusesAction: ActionFn<
    ActionState,
    UpdateProjectStatusesPayload
  >;
  projectFiltersFormContainer: React.ReactNode;
  newProjectFormContainer: React.ReactNode;
  projectsContainer: React.ReactNode;
}

export function ProjectsPage({
  createProjectCategoryAction,
  deleteProjectsAction,
  updateProjectStatusesAction,
  projectFiltersFormContainer,
  newProjectFormContainer,
  projectsContainer,
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
                filtersForm={projectFiltersFormContainer}
              />
              <ProjectToolbarActionsMenuTrigger
                deleteAction={deleteProjectsAction}
                updateStatusAction={updateProjectStatusesAction}
              />
              <ViewModeToggleButtonGroup className="ml-auto" />
              <ProjectToolbarCreateNewMenuTrigger
                newProjectForm={newProjectFormContainer}
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
                filtersForm={projectFiltersFormContainer}
              />
              <ProjectToolbarActionsMenuTrigger
                deleteAction={deleteProjectsAction}
                updateStatusAction={updateProjectStatusesAction}
              />
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <ViewModeToggleButtonGroup />
              <ProjectToolbarCreateNewMenuTrigger
                newProjectForm={newProjectFormContainer}
                newProjectCategoryForm={
                  <NewProjectCategoryForm
                    formAction={createProjectCategoryAction}
                  />
                }
              />
            </ToolbarMobileBottom>

            {projectsContainer}
          </SelectionProvider>
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
