import { PageListSkeleton } from "@/components/common/PageListSkeleton";
import { ProjectListItemSkeleton } from "@/components/projects/ProjectListItem";
import { useTranslations } from "next-intl";

export default function ProjectsPageLoading() {
  const t = useTranslations("app.ProjectsPageLoading");

  return (
    <PageListSkeleton
      title={t("title")}
      renderItemSkeleton={() => <ProjectListItemSkeleton />}
    />
  );
}
