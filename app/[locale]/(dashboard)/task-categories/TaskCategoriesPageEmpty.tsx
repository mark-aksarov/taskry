import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { TaskCategoryToolbarCreateNewModalTrigger } from "@/components/taskCategory/TaskCategoryToolbarCreateNewModalTrigger";

interface TaskCategoriesPageEmptyProps {
  createTaskCategory: ActionFn<ActionState, FormData>;
}

export function TaskCategoriesPageEmpty({
  createTaskCategory,
}: TaskCategoriesPageEmptyProps) {
  const t = useTranslations("app.TaskCategoriesPageEmpty");

  const taskCategoryToolbarCreateNewModalTrigger = (
    <TaskCategoryToolbarCreateNewModalTrigger
      createTaskCategory={createTaskCategory}
    />
  );

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={taskCategoryToolbarCreateNewModalTrigger}
    />
  );
}
