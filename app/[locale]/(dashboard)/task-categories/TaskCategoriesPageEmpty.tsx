import { useTranslations } from "next-intl";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";

interface TaskCategoriesPageEmptyProps {
  taskCategoryToolbarCreateNewModalTrigger: React.ReactNode;
}

export function TaskCategoriesPageEmpty({
  taskCategoryToolbarCreateNewModalTrigger,
}: TaskCategoriesPageEmptyProps) {
  const t = useTranslations("app.TaskCategoriesPageEmpty");

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={taskCategoryToolbarCreateNewModalTrigger}
    />
  );
}
