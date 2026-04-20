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
import { PageGrid } from "@/dashboard/common/PageGrid";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { PageEmptySection } from "@/dashboard/common/PageEmptySection";
import { ViewModeToggleButtonGroup } from "@/dashboard/common/ViewMode";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { SearchModalTrigger } from "@/dashboard/search/SearchModalTrigger";
import { ProjectResultsCount } from "@/dashboard/projects/ProjectResultsCount";
import { ProjectActionsMenuTrigger } from "@/dashboard/projects/ProjectActionsMenuTrigger";
import { ProjectsFilteredEmptySection } from "@/dashboard/projects/ProjectsFilteredEmptySection";
import { ProjectStatusFiltersModalTrigger } from "@/dashboard/projects/ProjectStatusFiltersModal";
import { ProjectCreatorFiltersModalTrigger } from "@/dashboard/projects/ProjectCreatorFiltersModal";
import { ProjectCategoryFiltersModalTrigger } from "@/dashboard/projects/ProjectCategoryFiltersModal";
import { ProjectCustomerFiltersModalTrigger } from "@/dashboard/projects/ProjectCustomerFiltersModal";
import { ProjectsEmptySectionCreateButton } from "@/dashboard/projects/ProjectsEmptySectionCreateButton";

interface ProjectsPageProps {
  totalCount: number;
  totalFilteredProjects: number;
  selectedSortField: ProjectSortField;
  projectsContainer: React.ReactNode;
}

export function ProjectsPage({
  totalCount,
  totalFilteredProjects,
  selectedSortField,
  projectsContainer,
}: ProjectsPageProps) {
  const t = useTranslations("app.ProjectsPage");

  if (totalCount === 0) {
    return (
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
    );
  }

  const isFilteredEmpty = totalFilteredProjects === 0;

  return (
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
            <ProjectCategoryFiltersModalTrigger />
            <ProjectCreatorFiltersModalTrigger />
            <ProjectCustomerFiltersModalTrigger />
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
            projectsContainer
          )}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
