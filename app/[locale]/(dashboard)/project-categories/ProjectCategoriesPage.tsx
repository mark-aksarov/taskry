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
import { SelectedItem } from "@/lib/hooks/useSelectedItemsState";
import { TaskSearchModal } from "@/dashboard/tasks/TaskSearchModal";
import { PageEmptySection } from "@/dashboard/common/PageEmptySection";
import { ToolbarLarge, ToolbarMobile } from "@/dashboard/common/Toolbar";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { CreateProjectCategoryModal } from "@/dashboard/projectCategory/CreateProjectCategoryModal";
import { DeleteProjectCategoriesModal } from "@/dashboard/projectCategory/DeleteProjectCategoriesModal";
import { ImportProjectCategoriesModal } from "@/dashboard/projectCategory/ImportProjectCategoriesModal";
import { CreateProjectCategoryProvider } from "@/dashboard/projectCategory/CreateProjectCategoryContext";
import { DeleteProjectCategoriesProvider } from "@/dashboard/projectCategory/DeleteProjectCategoriesContext";
import { ProjectCategoryActionsMenuTrigger } from "@/dashboard/projectCategory/ProjectCategoryActionsMenuTrigger";
import { ProjectCategoriesEmptySectionCreateButton } from "@/dashboard/projectCategory/ProjectCategoriesEmptySectionCreateButton";

interface ProjectCategoriesPageProps {
  totalCount: number;
  selectedItems: SelectedItem[];
  projectCategoriesContainer: React.ReactNode;
  searchContainer: React.ReactNode;
}

export function ProjectCategoriesPage({
  totalCount,
  selectedItems,
  projectCategoriesContainer,
  searchContainer,
}: ProjectCategoriesPageProps) {
  const t = useTranslations("app.ProjectCategoriesPage");

  const isEmpty = totalCount === 0;

  return (
    <SelectedItemsProvider pageItems={selectedItems}>
      <DeleteProjectCategoriesProvider>
        <CreateProjectCategoryProvider>
          <DashboardContainer fullscreen={isEmpty} headerOffset={isEmpty}>
            <DashboardGrid
              className={isEmpty ? "relative flex-auto" : undefined}
            >
              {isEmpty ? (
                <>
                  <ToolbarLarge
                    firstSlot={<ProjectCategoryManageMenuTriggerLarge />}
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
                </>
              ) : (
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
              )}
            </DashboardGrid>
          </DashboardContainer>

          <TaskSearchModal searchContainer={searchContainer} />
          <CreateProjectCategoryModal />
          <DeleteProjectCategoriesModal />
          <ImportProjectCategoriesModal />
        </CreateProjectCategoryProvider>
      </DeleteProjectCategoriesProvider>
    </SelectedItemsProvider>
  );
}
