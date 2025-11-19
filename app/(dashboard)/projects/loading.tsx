import { PageListSkeleton } from "@/components/common/PageListSkeleton";
import { ProjectListItemSkeleton } from "@/components/projects/ProjectListItem";

export default function ProjectsPageLoading() {
  return (
    <PageListSkeleton
      title="All Projects"
      renderItemSkeleton={() => <ProjectListItemSkeleton />}
    />
  );
}
