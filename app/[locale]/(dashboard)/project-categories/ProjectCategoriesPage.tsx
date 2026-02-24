import {
  ToolbarDesktop,
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ViewModeProvider } from "@/components/common/ViewMode";
import { PageContainer } from "@/components/common/PageContainer";
import { ProjectCategoryToolbarCreateNewModalTrigger } from "@/components/projectCategory/ProjectCategoryToolbarCreateNewModalTrigger";
import { ProjectCategoryToolbarActionsMenuTrigger } from "@/components/projectCategory/ProjectCategoryToolbarActionsMenuTrigger";

interface ProjectCategoriesPageProps {
  projectCategoriesContainer: React.ReactNode;
  guestMode: boolean;
  createProjectCategory: ActionFn<ActionState, FormData>;
  deleteProjectCategories: ActionFn<ActionState, number[]>;
}

export function ProjectCategoriesPage({
  projectCategoriesContainer,
  guestMode,
  createProjectCategory,
  deleteProjectCategories,
}: ProjectCategoriesPageProps) {
  const t = useTranslations("app.ProjectCategoriesPage");

  const projectCategoryToolbarCreateNewModalTrigger = (
    <ProjectCategoryToolbarCreateNewModalTrigger
      guestMode={guestMode}
      createProjectCategory={createProjectCategory}
    />
  );

  const projectCategoryToolbarActionsMenuTrigger = (
    <ProjectCategoryToolbarActionsMenuTrigger
      guestMode={guestMode}
      deleteProjectCategories={deleteProjectCategories}
    />
  );

  return (
    <PageContainer>
      <PageGrid>
        <ViewModeProvider>
          <ToolbarDesktop>
            {projectCategoryToolbarActionsMenuTrigger}
            {projectCategoryToolbarCreateNewModalTrigger}
          </ToolbarDesktop>

          <ToolbarMobileTop>
            <BackButton />
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            {projectCategoryToolbarActionsMenuTrigger}
          </ToolbarMobileTop>

          <ToolbarMobileBottom>
            <div className="ml-auto">
              {projectCategoryToolbarCreateNewModalTrigger}
            </div>
          </ToolbarMobileBottom>

          {projectCategoriesContainer}
        </ViewModeProvider>
      </PageGrid>
    </PageContainer>
  );
}
