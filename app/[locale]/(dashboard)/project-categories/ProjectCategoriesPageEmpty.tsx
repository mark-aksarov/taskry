import { useTranslations } from "next-intl";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";

interface ProjectCategoriesPageEmptyProps {
  projectCategoryToolbarCreateNewButton: React.ReactNode;
}

export function ProjectCategoriesPageEmpty({
  projectCategoryToolbarCreateNewButton,
}: ProjectCategoriesPageEmptyProps) {
  const t = useTranslations("app.ProjectCategoriesPageEmpty");

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={projectCategoryToolbarCreateNewButton}
    />
  );
}
