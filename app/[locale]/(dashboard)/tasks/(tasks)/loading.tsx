import { useTranslations } from "next-intl";
import { TaskListItemSkeleton } from "@/components/tasks/TaskListItem";
import { PageListSkeleton } from "@/components/common/PageListSkeleton";

export default function TasksPageLoading() {
  const t = useTranslations("app.TasksPageLoading");

  return (
    <PageListSkeleton
      title={t("title")}
      renderItemSkeleton={() => <TaskListItemSkeleton showCheckbox />}
    />
  );
}
