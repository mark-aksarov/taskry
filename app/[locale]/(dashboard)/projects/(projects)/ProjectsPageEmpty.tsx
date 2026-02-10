import { useTranslations } from "next-intl";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";

interface ProjectsPageEmptyProps {
  projectToolbarCreateNewMenuTrigger: React.ReactNode;
}

export function ProjectsPageEmpty({
  projectToolbarCreateNewMenuTrigger,
}: ProjectsPageEmptyProps) {
  const t = useTranslations("app.ProjectsPageEmpty");

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={projectToolbarCreateNewMenuTrigger}
    />
  );
}
