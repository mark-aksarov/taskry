import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";
import { TaskCategoryToolbarCreateNewModalTrigger } from "@/components/taskCategory/TaskCategoryToolbarCreateNewModalTrigger";

interface TaskCategoriesPageEmptyProps {
  guestMode: boolean;
  createTaskCategory: ActionFn<ActionState, FormData>;
}

export function TaskCategoriesPageEmpty({
  guestMode,
  createTaskCategory,
}: TaskCategoriesPageEmptyProps) {
  const t = useTranslations("app.TaskCategoriesPageEmpty");

  const taskCategoryToolbarCreateNewModalTrigger = (
    <TaskCategoryToolbarCreateNewModalTrigger
      guestMode={guestMode}
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
