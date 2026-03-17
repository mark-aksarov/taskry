import {
  ToolbarLarge,
  ToolbarMobile,
  ToolbarSearchMobile,
  ToolbarFiltersMobile,
} from "@/components/common/Toolbar";

import {
  ProjectManageMenuTriggerLarge,
  ProjectManageMenuTriggerMobile,
} from "@/components/projects/ProjectManageMenuTrigger";

import {
  ProjectSortingMenuTriggerLarge,
  ProjectSortingMenuTriggerMobile,
} from "@/components/projects/ProjectSortingMenuTrigger";

import {
  CreateProjectMenuTriggerLarge,
  CreateProjectMenuTriggerMobile,
} from "@/components/projects/CreateProjectMenuTrigger";

import {
  ProjectFiltersModalTriggerLarge,
  ProjectFiltersModalTriggerMobile,
} from "@/components/projects/ProjectFiltersModal";

import { useTranslations } from "next-intl";
import { ProjectSortField } from "@/lib/types";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { PageEmptySection } from "@/components/common/PageEmptySection";
import { NewProjectModal } from "@/components/projects/NewProjectModal";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { SearchModalTrigger } from "@/components/search/SearchModalTrigger";
import { ProjectSearchModal } from "@/components/projects/ProjectSearchModal";
import { ProjectResultsCount } from "@/components/projects/ProjectResultsCount";
import { ProjectActionsMenuTrigger } from "@/components/projects/ProjectActionsMenuTrigger";
import { NewProjectCategoryModal } from "@/components/projectCategory/NewProjectCategoryModal";
import { ProjectsFilteredEmptySection } from "@/components/projects/ProjectsFilteredEmptySection";
import { ProjectStatusFiltersModalTrigger } from "@/components/projects/ProjectStatusFiltersModal";
import { ProjectCreatorFiltersModalTrigger } from "@/components/projects/ProjectCreatorFiltersModal";
import { ProjectCategoryFiltersModalTrigger } from "@/components/projects/ProjectCategoryFiltersModal";
import { ProjectCustomerFiltersModalTrigger } from "@/components/projects/ProjectCustomerFiltersModal";
import { ProjectsEmptySectionCreateButton } from "@/components/projects/ProjectsEmptySectionCreateButton";

interface ProjectsPageProps {
  totalCount: number;
  totalFilteredProjects: number;
  selectedSortField: ProjectSortField;
  searchContainer: React.ReactNode;
  projectsContainer: React.ReactNode;
  newProjectFormContainer: React.ReactNode;
  projectFiltersFormContainer: React.ReactNode;
  projectCategoryFiltersFormContainer: React.ReactNode;
  creatorFiltersFormContainer: React.ReactNode;
  customerFiltersFormContainer: React.ReactNode;
}

export function ProjectsPage({
  totalCount,
  totalFilteredProjects,
  selectedSortField,
  searchContainer,
  projectsContainer,
  newProjectFormContainer,
  projectFiltersFormContainer,
  projectCategoryFiltersFormContainer,
  creatorFiltersFormContainer,
  customerFiltersFormContainer,
}: ProjectsPageProps) {
  const t = useTranslations("app.ProjectsPage");

  if (totalCount === 0) {
    return (
      <>
        <PageContainer fullscreen headerOffset>
          <PageGrid className="relative flex-auto">
            <ToolbarLarge firstSlot={<ProjectManageMenuTriggerLarge />} />

            <ToolbarMobile
              firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
              secondSlot={<ProjectManageMenuTriggerMobile />}
            />

            <PageEmptySection
              heading={t("emptySection.heading")}
              description={t("emptySection.description")}
              createButton={<ProjectsEmptySectionCreateButton />}
            />
          </PageGrid>
        </PageContainer>

        <NewProjectModal newProjectFormContainer={newProjectFormContainer} />
      </>
    );
  }

  const isFilteredEmpty = totalFilteredProjects === 0;

  return (
    <>
      <PageContainer fullscreen={isFilteredEmpty} headerOffset>
        <PageGrid className="relative flex-auto">
          <ViewModeProvider>
            <ToolbarLarge
              firstSlot={
                <>
                  <ProjectManageMenuTriggerLarge />
                  <ProjectSortingMenuTriggerLarge
                    selectedSortField={selectedSortField}
                  />
                  <ProjectFiltersModalTriggerLarge
                    filtersFormContainer={projectFiltersFormContainer}
                  />
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
              firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
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
              <ProjectFiltersModalTriggerMobile
                filtersFormContainer={projectFiltersFormContainer}
              />
              <ProjectStatusFiltersModalTrigger />
              <ProjectCategoryFiltersModalTrigger
                filtersFormContainer={projectCategoryFiltersFormContainer}
              />
              <ProjectCreatorFiltersModalTrigger
                filtersFormContainer={creatorFiltersFormContainer}
              />
              <ProjectCustomerFiltersModalTrigger
                filtersFormContainer={customerFiltersFormContainer}
              />
            </ToolbarFiltersMobile>

            {!isFilteredEmpty && (
              <ToolbarMobile
                firstSlot={
                  <ProjectResultsCount count={totalFilteredProjects} />
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
              projectsContainer
            )}
          </ViewModeProvider>
        </PageGrid>
      </PageContainer>

      <ProjectSearchModal searchContainer={searchContainer} />
      <NewProjectModal newProjectFormContainer={newProjectFormContainer} />
      <NewProjectCategoryModal />
    </>
  );
}
