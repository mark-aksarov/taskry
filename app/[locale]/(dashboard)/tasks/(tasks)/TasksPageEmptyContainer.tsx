import { useTranslations } from "next-intl";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";

interface TasksPageEmptyContainerProps {
  taskToolbarCreateNewMenuTrigger: React.ReactNode;
}

export function TasksPageEmptyContainer({
  taskToolbarCreateNewMenuTrigger,
}: TasksPageEmptyContainerProps) {
  const t = useTranslations("app.TasksPageEmptyContainer");

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={taskToolbarCreateNewMenuTrigger}
    />
  );
}
