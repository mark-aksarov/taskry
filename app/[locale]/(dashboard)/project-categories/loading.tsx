import { useTranslations } from "next-intl";
import { PageListSkeleton } from "@/components/common/PageListSkeleton";
import { ProjectCategoryListItemSkeleton } from "@/components/projectCategory/ProjectCategoryListItem";

export default function ProjectCategoriesPageLoading() {
  const t = useTranslations("app.ProjectCategoriesPageLoading");

  return (
    <PageListSkeleton
      title={t("title")}
      renderItemSkeleton={() => <ProjectCategoryListItemSkeleton />}
    />
  );
}
