import { useTranslations } from "next-intl";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";

interface TaskCategoriesPageEmptyProps {
  taskCategoryToolbarCreateNewButton: React.ReactNode;
}

export function TaskCategoriesPageEmpty({
  taskCategoryToolbarCreateNewButton,
}: TaskCategoriesPageEmptyProps) {
  const t = useTranslations("app.TaskCategoriesPageEmpty");

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={taskCategoryToolbarCreateNewButton}
    />
  );
}
