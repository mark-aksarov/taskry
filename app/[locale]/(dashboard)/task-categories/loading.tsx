import { useTranslations } from "next-intl";
import { PageListSkeleton } from "@/components/common/PageListSkeleton";
import { TaskCategoryListItemSkeleton } from "@/components/taskCategory/TaskCategoryListItem";

export default function TaskCategoriesPageLoading() {
  const t = useTranslations("app.TaskCategoriesPageLoading");

  return (
    <PageListSkeleton
      title={t("title")}
      renderItemSkeleton={() => <TaskCategoryListItemSkeleton />}
    />
  );
}
