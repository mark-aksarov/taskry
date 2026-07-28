import {
  ToolbarLarge,
  ToolbarMobile,
  ToolbarSearchMobile,
  ToolbarFiltersMobile,
} from "@/dashboard/common/Toolbar";

import {
  ProjectManageMenuTriggerLarge,
  ProjectManageMenuTriggerMobile,
} from "@/dashboard/projects/ProjectManageMenuTrigger";

import {
  ProjectSortingMenuTriggerLarge,
  ProjectSortingMenuTriggerMobile,
} from "@/dashboard/projects/ProjectSortingMenuTrigger";

import {
  CreateProjectMenuTriggerLarge,
  CreateProjectMenuTriggerMobile,
} from "@/dashboard/projects/CreateProjectMenuTrigger";

import {
  ProjectFiltersModal,
  ProjectFiltersModalTriggerLarge,
  ProjectFiltersModalTriggerMobile,
} from "@/dashboard/projects/ProjectFiltersModal";

import {
  SelectedProject,
  SelectedProjectsProvider,
} from "@/dashboard/projects/SelectedProjectsContext";

import {
  ProjectStatusFiltersModal,
  ProjectStatusFiltersModalTrigger,
} from "@/dashboard/projects/ProjectStatusFiltersModal";

import {
  ProjectClientFiltersModal,
  ProjectClientFiltersModalTrigger,
} from "@/dashboard/projects/ProjectClientFiltersModal";

import {
  ProjectCreatorFiltersModal,
  ProjectCreatorFiltersModalTrigger,
} from "@/dashboard/projects/ProjectCreatorFiltersModal";

import {
  ProjectCategoryFiltersModal,
  ProjectCategoryFiltersModalTrigger,
} from "@/dashboard/projects/ProjectCategoryFiltersModal";

import { useTranslations } from "next-intl";
import { ProjectFilters, ProjectSortField } from "@/lib/types";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { PageEmptySection } from "@/dashboard/common/PageEmptySection";
import { EntityPagination } from "@/dashboard/common/EntityPagination";
import { ViewModeToggleButtonGroup } from "@/dashboard/common/ViewMode";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { SearchModalTrigger } from "@/dashboard/search/SearchModalTrigger";
import { ProjectSearchModal } from "@/dashboard/projects/ProjectSearchModal";
import { CreateProjectModal } from "@/dashboard/projects/CreateProjectModal";
import { ProjectResultsCount } from "@/dashboard/projects/ProjectResultsCount";
import { DeleteProjectsModal } from "@/dashboard/projects/DeleteProjectsModal";
import { ImportProjectsModal } from "@/dashboard/projects/ImportProjectsModal";
import { CreateProjectProvider } from "@/dashboard/projects/CreateProjectContext";
import { DeleteProjectsProvider } from "@/dashboard/projects/DeleteProjectsContext";
import { ProjectFiltersProvider } from "@/dashboard/projects/ProjectFiltersContext";
import { ProjectActionsMenuTrigger } from "@/dashboard/projects/ProjectActionsMenuTrigger";
import { ProjectsFilteredEmptySection } from "@/dashboard/projects/ProjectsFilteredEmptySection";
import { UpdateProjectStatusesProvider } from "@/dashboard/projects/UpdateProjectStatusesContext";
import { CreateProjectCategoryModal } from "@/dashboard/projectCategory/CreateProjectCategoryModal";
import { ProjectsEmptySectionCreateButton } from "@/dashboard/projects/ProjectsEmptySectionCreateButton";
import { CreateProjectCategoryProvider } from "@/dashboard/projectCategory/CreateProjectCategoryContext";

interface ProjectsPageProps {
  page: number;
  pageSize: number;
  totalCount: number;
  categoryCount: number;
  clientCount: number;
  totalFilteredProjects: number;
  selectedSortField: ProjectSortField;
  selectedItems: SelectedProject[];
  filters: ProjectFilters;
  projectGrid: React.ReactNode;
  searchContainer: React.ReactNode;
  createProjectFormContainer: React.ReactNode;
  projectFiltersFormContainer: React.ReactNode;
  projectClientFiltersFormContainer: React.ReactNode;
  projectCategoryFiltersFormContainer: React.ReactNode;
  projectCreatorFiltersFormContainer: React.ReactNode;
}

export function ProjectsPage({
  page,
  pageSize,
  totalCount,
  categoryCount,
  clientCount,
  totalFilteredProjects,
  selectedSortField,
  selectedItems,
  filters,
  projectGrid,
  searchContainer,
  createProjectFormContainer,
  projectFiltersFormContainer,
  projectClientFiltersFormContainer,
  projectCategoryFiltersFormContainer,
  projectCreatorFiltersFormContainer,
}: ProjectsPageProps) {
  const t = useTranslations("app.ProjectsPage");

  const isEmpty = totalCount === 0;
  const isFilteredEmpty = !isEmpty && totalFilteredProjects === 0;

  return (
    <SelectedProjectsProvider pageItems={selectedItems}>
      <UpdateProjectStatusesProvider>
        <DeleteProjectsProvider>
          <CreateProjectProvider>
            <CreateProjectCategoryProvider>
              <ProjectFiltersProvider filters={filters}>
                <DashboardContainer
                  fullscreen={isEmpty || isFilteredEmpty}
                  headerOffset
                >
                  <DashboardGrid className="relative flex-auto">
                    {isEmpty ? (
                      <>
                        <ToolbarLarge
                          firstSlot={<ProjectManageMenuTriggerLarge />}
                        />

                        <ToolbarMobile
                          firstSlot={
                            <PageHeadingMobile>
                              {t("heading")}
                            </PageHeadingMobile>
                          }
                          secondSlot={<ProjectManageMenuTriggerMobile />}
                        />

                        <PageEmptySection
                          heading={t("emptySection.heading")}
                          description={t("emptySection.description")}
                          createButton={<ProjectsEmptySectionCreateButton />}
                        />
                      </>
                    ) : (
                      <ViewModeProvider>
                        <ToolbarLarge
                          firstSlot={
                            <>
                              <ProjectManageMenuTriggerLarge />
                              <ProjectSortingMenuTriggerLarge
                                selectedSortField={selectedSortField}
                              />
                              <ProjectFiltersModalTriggerLarge />
                              <ProjectActionsMenuTrigger />
                            </>
                          }
                          secondSlot={
                            <>
                              <ViewModeToggleButtonGroup />
                              <CreateProjectMenuTriggerLarge />
                            </>
                          }
                          twoRowsOnLg
                        />

                        <ToolbarMobile
                          firstSlot={
                            <PageHeadingMobile>
                              {t("heading")}
                            </PageHeadingMobile>
                          }
                          secondSlot={
                            <>
                              <CreateProjectMenuTriggerMobile />
                              <ProjectManageMenuTriggerMobile />
                            </>
                          }
                        />

                        <ToolbarSearchMobile>
                          <SearchModalTrigger />
                        </ToolbarSearchMobile>

                        <ToolbarFiltersMobile>
                          <ProjectFiltersModalTriggerMobile />
                          <ProjectStatusFiltersModalTrigger />
                          {categoryCount > 0 && (
                            <ProjectCategoryFiltersModalTrigger />
                          )}
                          <ProjectCreatorFiltersModalTrigger />
                          {clientCount > 0 && (
                            <ProjectClientFiltersModalTrigger />
                          )}
                        </ToolbarFiltersMobile>

                        {!isFilteredEmpty && (
                          <ToolbarMobile
                            firstSlot={
                              <ProjectResultsCount
                                count={totalFilteredProjects}
                              />
                            }
                            secondSlot={
                              <ProjectSortingMenuTriggerMobile
                                selectedSortField={selectedSortField}
                              />
                            }
                          />
                        )}

                        {isFilteredEmpty ? (
                          <ProjectsFilteredEmptySection />
                        ) : (
                          <>
                            {projectGrid}

                            <EntityPagination
                              page={page}
                              pageSize={pageSize}
                              totalPages={Math.ceil(
                                totalFilteredProjects / pageSize,
                              )}
                            />
                          </>
                        )}
                      </ViewModeProvider>
                    )}
                  </DashboardGrid>
                </DashboardContainer>

                <ProjectSearchModal searchContainer={searchContainer} />
                <CreateProjectModal
                  createProjectFormContainer={createProjectFormContainer}
                />
                <CreateProjectCategoryModal />
                <ProjectFiltersModal
                  filtersFormContainer={projectFiltersFormContainer}
                />
                <ProjectClientFiltersModal
                  filtersFormContainer={projectClientFiltersFormContainer}
                />
                <ProjectCategoryFiltersModal
                  filtersFormContainer={projectCategoryFiltersFormContainer}
                />
                <ProjectCreatorFiltersModal
                  filtersFormContainer={projectCreatorFiltersFormContainer}
                />
                <DeleteProjectsModal />
                <ProjectStatusFiltersModal />
                <ImportProjectsModal />
              </ProjectFiltersProvider>
            </CreateProjectCategoryProvider>
          </CreateProjectProvider>
        </DeleteProjectsProvider>
      </UpdateProjectStatusesProvider>
    </SelectedProjectsProvider>
  );
}
