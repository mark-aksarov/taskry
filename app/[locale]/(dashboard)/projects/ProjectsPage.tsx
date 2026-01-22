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
import { ProjectToolbarSortingMenuTrigger } from "@/components/projects/ProjectToolbarSortingMenuTrigger";

interface ProjectsPageProps {
  projectsContainer: React.ReactNode;
  projectToolbarCreateNewMenuTrigger: React.ReactNode;
  projectToolbarFiltersModalTrigger: React.ReactNode;
  projectToolbarActionsMenuTrigger: React.ReactNode;
}

export function ProjectsPage({
  projectsContainer,
  projectToolbarCreateNewMenuTrigger,
  projectToolbarFiltersModalTrigger,
  projectToolbarActionsMenuTrigger,
}: ProjectsPageProps) {
  const t = useTranslations("app.ProjectsPage");

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <SelectionProvider>
            <ToolbarDesktop>
              <ProjectToolbarSortingMenuTrigger />
              {projectToolbarFiltersModalTrigger}
              {projectToolbarActionsMenuTrigger}

              <ViewModeToggleButtonGroup className="ml-auto" />
              {projectToolbarCreateNewMenuTrigger}
            </ToolbarDesktop>

            <ToolbarMobileTop>
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
              <ProjectToolbarSortingMenuTrigger />
              {projectToolbarFiltersModalTrigger}
              {projectToolbarActionsMenuTrigger}
            </ToolbarMobileTop>

            <ToolbarMobileBottom>
              <ViewModeToggleButtonGroup />
              {projectToolbarCreateNewMenuTrigger}
            </ToolbarMobileBottom>

            {projectsContainer}
          </SelectionProvider>
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
