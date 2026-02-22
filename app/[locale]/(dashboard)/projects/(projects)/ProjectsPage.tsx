import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { ProjectSortField } from "@/lib/types";
import { PageGrid } from "@/components/common/PageGrid";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { ViewModeToggleButtonGroup } from "@/components/common/ViewMode";
import { ProjectsFilteredEmptySection } from "@/components/projects/ProjectsFilteredEmptySection";
import { ProjectToolbarManageMenuTrigger } from "@/components/projects/ProjectToolbarManageMenuTrigger";
import { ProjectToolbarSortingMenuTrigger } from "@/components/projects/ProjectToolbarSortingMenuTrigger";

interface ProjectsPageProps {
  totalFilteredProjects: number;
  projectsContainer: React.ReactNode;
  projectToolbarCreateNewMenuTrigger: React.ReactNode;
  projectToolbarFiltersModalTrigger: React.ReactNode;
  projectToolbarActionsMenuTrigger: React.ReactNode;
  selectedSortField: ProjectSortField;
}

export function ProjectsPage({
  totalFilteredProjects,
  projectsContainer,
  projectToolbarCreateNewMenuTrigger,
  projectToolbarFiltersModalTrigger,
  projectToolbarActionsMenuTrigger,
  selectedSortField,
}: ProjectsPageProps) {
  const t = useTranslations("app.ProjectsPage");

  return (
    <PageContainer
      fullscreen={totalFilteredProjects === 0}
      className="relative"
    >
      <PageGrid className="flex-auto">
        <ViewModeProvider>
          <ToolbarDesktop>
            <ProjectToolbarManageMenuTrigger />
            <ProjectToolbarSortingMenuTrigger
              selectedSortField={selectedSortField}
            />
            {projectToolbarFiltersModalTrigger}
            {projectToolbarActionsMenuTrigger}
            <ViewModeToggleButtonGroup className="ml-auto" />
            {projectToolbarCreateNewMenuTrigger}
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            <ProjectToolbarManageMenuTrigger />
            <ProjectToolbarSortingMenuTrigger
              selectedSortField={selectedSortField}
            />
            {projectToolbarFiltersModalTrigger}
            {projectToolbarActionsMenuTrigger}
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <ViewModeToggleButtonGroup />
            {projectToolbarCreateNewMenuTrigger}
          </ToolbarMobileBottom>

          {totalFilteredProjects === 0 ? (
            <ProjectsFilteredEmptySection />
          ) : (
            projectsContainer
          )}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
