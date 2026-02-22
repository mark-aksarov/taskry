import { useTranslations } from "next-intl";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";

interface ProjectsPageEmptyContainerProps {
  projectToolbarCreateNewMenuTrigger: React.ReactNode;
}

export function ProjectsPageEmptyContainer({
  projectToolbarCreateNewMenuTrigger,
}: ProjectsPageEmptyContainerProps) {
  const t = useTranslations("app.ProjectsPageEmptyContainer");

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={projectToolbarCreateNewMenuTrigger}
    />
  );
}
