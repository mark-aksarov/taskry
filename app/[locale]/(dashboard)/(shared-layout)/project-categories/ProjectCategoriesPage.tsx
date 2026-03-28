import {
  CreateProjectCategoryModalTriggerLarge,
  CreateProjectCategoryModalTriggerMobile,
} from "@/components/projectCategory/CreateProjectCategoryModalTrigger";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { PageEmptySection } from "@/components/common/PageEmptySection";
import { ToolbarLarge, ToolbarMobile } from "@/components/common/Toolbar";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { CreateProjectCategoryModal } from "@/components/projectCategory/CreateProjectCategoryModal";
import { ProjectCategoryActionsMenuTrigger } from "@/components/projectCategory/ProjectCategoryActionsMenuTrigger";
import { ProjectCategoriesEmptySectionCreateButton } from "@/components/projectCategory/ProjectCategoriesEmptySectionCreateButton";

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
      <PageContainer fullscreen headerOffset>
        <PageGrid className="relative flex-auto">
          <ToolbarMobile
            firstSlot={
              <>
                <BackButton href="/projects" />
                <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
              </>
            }
          />

          <PageEmptySection
            heading={t("emptySection.heading")}
            description={t("emptySection.description")}
            createButton={<ProjectCategoriesEmptySectionCreateButton />}
          />
        </PageGrid>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarLarge
            firstSlot={<ProjectCategoryActionsMenuTrigger />}
            secondSlot={<CreateProjectCategoryModalTriggerLarge />}
          />

          <ToolbarMobile
            firstSlot={
              <>
                <BackButton href="/projects" />
                <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
              </>
            }
            secondSlot={<CreateProjectCategoryModalTriggerMobile />}
          />

          {projectCategoriesContainer}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
