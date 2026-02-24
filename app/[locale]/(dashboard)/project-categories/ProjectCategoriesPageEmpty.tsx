import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { ProjectCategoryToolbarCreateNewModalTrigger } from "@/components/projectCategory/ProjectCategoryToolbarCreateNewModalTrigger";

interface ProjectCategoriesPageEmptyProps {
  guestMode: boolean;
  createProjectCategory: ActionFn<ActionState, FormData>;
}

export function ProjectCategoriesPageEmpty({
  guestMode,
  createProjectCategory,
}: ProjectCategoriesPageEmptyProps) {
  const t = useTranslations("app.ProjectCategoriesPageEmpty");

  const projectCategoryToolbarCreateNewModalTrigger = (
    <ProjectCategoryToolbarCreateNewModalTrigger
      guestMode={guestMode}
      createProjectCategory={createProjectCategory}
    />
  );

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={projectCategoryToolbarCreateNewModalTrigger}
    />
  );
}
