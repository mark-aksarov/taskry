import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { ProjectCategoryToolbarCreateNewModalTrigger } from "@/components/projectCategory/ProjectCategoryToolbarCreateNewModalTrigger";

interface ProjectCategoriesPageEmptyProps {
  createProjectCategory: ActionFn<ActionState, FormData>;
}

export function ProjectCategoriesPageEmpty({
  createProjectCategory,
}: ProjectCategoriesPageEmptyProps) {
  const t = useTranslations("app.ProjectCategoriesPageEmpty");

  const projectCategoryToolbarCreateNewModalTrigger = (
    <ProjectCategoryToolbarCreateNewModalTrigger
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
