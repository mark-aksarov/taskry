import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { TaskToolbarCreateNewMenuTrigger } from "@/components/tasks/TaskToolbarCreateNewMenuTrigger";

interface TasksPageEmptyContainerProps {
  newTaskFormContainer: React.ReactNode;
  createTaskCategory: ActionFn<ActionState, FormData>;
}

export function TasksPageEmptyContainer({
  newTaskFormContainer,
  createTaskCategory,
}: TasksPageEmptyContainerProps) {
  const t = useTranslations("app.TasksPageEmptyContainer");

  const taskToolbarCreateNewMenuTrigger = (
    <TaskToolbarCreateNewMenuTrigger
      newTaskFormContainer={newTaskFormContainer}
      createTaskCategory={createTaskCategory}
    />
  );

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={taskToolbarCreateNewMenuTrigger}
    />
  );
}
