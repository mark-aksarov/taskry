import { PageListSkeleton } from "@/components/common/PageListSkeleton";
import { TaskListItemSkeleton } from "@/components/tasks/TaskListItem";
import { useTranslations } from "next-intl";

export default function TasksPageLoading() {
  const t = useTranslations("app.TasksPageLoading");

  return (
    <PageListSkeleton
      title={t("title")}
      renderItemSkeleton={() => <TaskListItemSkeleton />}
    />
  );
}
