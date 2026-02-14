import { useTranslations } from "next-intl";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";

interface ProjectCategoriesPageEmptyProps {
  projectCategoryToolbarCreateNewModalTrigger: React.ReactNode;
}

export function ProjectCategoriesPageEmpty({
  projectCategoryToolbarCreateNewModalTrigger,
}: ProjectCategoriesPageEmptyProps) {
  const t = useTranslations("app.ProjectCategoriesPageEmpty");

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={projectCategoryToolbarCreateNewModalTrigger}
    />
  );
}
