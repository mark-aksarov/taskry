import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { ProjectToolbarCreateNewMenuTrigger } from "@/components/projects/ProjectToolbarCreateNewMenuTrigger";

interface ProjectsPageEmptyContainerProps {
  newProjectFormContainer: React.ReactNode;
  createProjectCategory: ActionFn<ActionState, FormData>;
}

export function ProjectsPageEmptyContainer({
  newProjectFormContainer,
  createProjectCategory,
}: ProjectsPageEmptyContainerProps) {
  const t = useTranslations("app.ProjectsPageEmptyContainer");

  const toolbarCreateNewMenuTrigger = (
    <ProjectToolbarCreateNewMenuTrigger
      newProjectFormContainer={newProjectFormContainer}
      createProjectCategory={createProjectCategory}
    />
  );

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={toolbarCreateNewMenuTrigger}
    />
  );
}
