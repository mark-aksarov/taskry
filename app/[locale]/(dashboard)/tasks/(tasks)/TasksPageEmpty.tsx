import { useTranslations } from "next-intl";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";

interface TasksPageEmptyProps {
  taskToolbarCreateNewMenuTrigger: React.ReactNode;
}

export function TasksPageEmpty({
  taskToolbarCreateNewMenuTrigger,
}: TasksPageEmptyProps) {
  const t = useTranslations("app.TasksPageEmpty");

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={taskToolbarCreateNewMenuTrigger}
    />
  );
}
