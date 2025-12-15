import { ProjectsPage } from "./ProjectsPage";
import { getProjectCount } from "@/lib/queries/project";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { getPageParams } from "@/lib/utils/getPageParams";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectsServerContainer } from "@/components/projects/ProjectsServerContainer";
import { NewProjectFormServerContainer } from "@/components/projects/NewProjectFormServerContainer";
import { ProjectFiltersFormServerContainer } from "@/components/projects/ProjectFiltersFormServerContainer";

export default async function AppProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  await requireProtectedPage();

  const params = await searchParams;
  const { page, pageSize } = getPageParams(params);
  const projectCount = await getProjectCount();

  if (!projectCount) return <ProjectsPageEmpty />;

  return (
    <ProjectsPage
      page={page}
      pageSize={pageSize}
      ProjectFiltersFormContainer={ProjectFiltersFormServerContainer}
      ProjectsServerContainer={ProjectsServerContainer}
      NewProjectFormContainer={NewProjectFormServerContainer}
    />
  );
}
