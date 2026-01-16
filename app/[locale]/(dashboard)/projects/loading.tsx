import { useTranslations } from "next-intl";
import { PageListSkeleton } from "@/components/common/PageListSkeleton";
import { ProjectListItemSkeleton } from "@/components/projects/ProjectListItem";

export default function ProjectsPageLoading() {
  const t = useTranslations("app.ProjectsPageLoading");

  return (
    <PageListSkeleton
      title={t("title")}
      renderItemSkeleton={() => <ProjectListItemSkeleton showCheckbox />}
    />
  );
}
