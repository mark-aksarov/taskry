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
  ProjectFiltersModalTriggerLarge,
  ProjectFiltersModalTriggerMobile,
} from "@/dashboard/projects/ProjectFiltersModal";

import { useTranslations } from "next-intl";
import { ProjectSortField } from "@/lib/types";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { PageEmptySection } from "@/dashboard/common/PageEmptySection";
import { ViewModeToggleButtonGroup } from "@/dashboard/common/ViewMode";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { SearchModalTrigger } from "@/dashboard/search/SearchModalTrigger";
import { ProjectResultsCount } from "@/dashboard/projects/ProjectResultsCount";
import { EntityPagination } from "@/dashboard/common/EntityPagination";
import { ProjectActionsMenuTrigger } from "@/dashboard/projects/ProjectActionsMenuTrigger";
import { ProjectsFilteredEmptySection } from "@/dashboard/projects/ProjectsFilteredEmptySection";
import { ProjectStatusFiltersModalTrigger } from "@/dashboard/projects/ProjectStatusFiltersModal";
import { ProjectCreatorFiltersModalTrigger } from "@/dashboard/projects/ProjectCreatorFiltersModal";
import { ProjectCategoryFiltersModalTrigger } from "@/dashboard/projects/ProjectCategoryFiltersModal";
import { ProjectCustomerFiltersModalTrigger } from "@/dashboard/projects/ProjectCustomerFiltersModal";
import { ProjectsEmptySectionCreateButton } from "@/dashboard/projects/ProjectsEmptySectionCreateButton";

interface ProjectsPageProps {
  page: number;
  pageSize: number;
  totalCount: number;
  categoryCount: number;
  customerCount: number;
  totalFilteredProjects: number;
  selectedSortField: ProjectSortField;
  projectGrid: React.ReactNode;
}

export function ProjectsPage({
  page,
  pageSize,
  totalCount,
  categoryCount,
  customerCount,
  totalFilteredProjects,
  selectedSortField,
  projectGrid,
}: ProjectsPageProps) {
  const t = useTranslations("app.ProjectsPage");

  if (totalCount === 0) {
    return (
      <DashboardContainer fullscreen headerOffset>
        <DashboardGrid className="relative flex-auto">
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
        </DashboardGrid>
      </DashboardContainer>
    );
  }

  const isFilteredEmpty = totalFilteredProjects === 0;

  return (
    <DashboardContainer fullscreen={isFilteredEmpty} headerOffset>
      <DashboardGrid className="relative flex-auto">
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
            <ProjectFiltersModalTriggerMobile />
            <ProjectStatusFiltersModalTrigger />
            {categoryCount > 0 && <ProjectCategoryFiltersModalTrigger />}
            <ProjectCreatorFiltersModalTrigger />
            {customerCount > 0 && <ProjectCustomerFiltersModalTrigger />}
          </ToolbarFiltersMobile>

          {!isFilteredEmpty && (
            <ToolbarMobile
              firstSlot={<ProjectResultsCount count={totalFilteredProjects} />}
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
              <>{projectGrid}</>
              <EntityPagination
                page={page}
                pageSize={pageSize}
                totalPages={Math.ceil(totalFilteredProjects / pageSize)}
              />
            </>
          )}
        </ViewModeProvider>
      </DashboardGrid>
    </DashboardContainer>
  );
}
