import {
  CreateProjectCategoryModalTriggerLarge,
  CreateProjectCategoryModalTriggerMobile,
} from "@/dashboard/projectCategory/CreateProjectCategoryModalTrigger";

import {
  ProjectCategoryManageMenuTriggerLarge,
  ProjectCategoryManageMenuTriggerMobile,
} from "@/dashboard/projectCategory/ProjectCategoryManageMenuTrigger";

import { useTranslations } from "next-intl";
import { BackButton } from "@/dashboard/common/BackButton";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { PageEmptySection } from "@/dashboard/common/PageEmptySection";
import { ToolbarLarge, ToolbarMobile } from "@/dashboard/common/Toolbar";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { ProjectCategoryActionsMenuTrigger } from "@/dashboard/projectCategory/ProjectCategoryActionsMenuTrigger";
import { ProjectCategoriesEmptySectionCreateButton } from "@/dashboard/projectCategory/ProjectCategoriesEmptySectionCreateButton";

interface ProjectCategoriesPageProps {
  totalCount: number;
  projectCategoriesContainer: React.ReactNode;
}

export function ProjectCategoriesPage({
  totalCount,
  projectCategoriesContainer,
}: ProjectCategoriesPageProps) {
  const t = useTranslations("app.ProjectCategoriesPage");

  if (totalCount === 0) {
    return (
      <DashboardContainer fullscreen headerOffset>
        <DashboardGrid className="relative flex-auto">
          <ToolbarLarge
            firstSlot={<ProjectCategoryManageMenuTriggerLarge />}
            twoRowsOnLg
          />

          <ToolbarMobile
            firstSlot={
              <>
                <BackButton fallbackHref="/projects" />
                <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
              </>
            }
            secondSlot={<ProjectCategoryManageMenuTriggerMobile />}
          />

          <PageEmptySection
            heading={t("emptySection.heading")}
            description={t("emptySection.description")}
            createButton={<ProjectCategoriesEmptySectionCreateButton />}
          />
        </DashboardGrid>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardGrid>
        <ViewModeProvider>
          <ToolbarLarge
            firstSlot={
              <>
                <ProjectCategoryManageMenuTriggerLarge />
                <ProjectCategoryActionsMenuTrigger />
              </>
            }
            secondSlot={<CreateProjectCategoryModalTriggerLarge />}
          />

          <ToolbarMobile
            firstSlot={
              <>
                <BackButton fallbackHref="/projects" />
                <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
              </>
            }
            secondSlot={
              <>
                <ProjectCategoryManageMenuTriggerMobile />
                <CreateProjectCategoryModalTriggerMobile />
              </>
            }
          />

          {projectCategoriesContainer}
        </ViewModeProvider>
      </DashboardGrid>
    </DashboardContainer>
  );
}
