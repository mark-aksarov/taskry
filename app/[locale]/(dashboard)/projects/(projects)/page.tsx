import { z } from "zod";
import { ProjectsPage } from "./ProjectsPage";
import { getProjectCount } from "@/lib/data/project";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectsServerContainer } from "@/components/projects/ProjectsServerContainer";
import { NewProjectFormServerContainer } from "@/components/projects/NewProjectFormServerContainer";
import { ProjectFiltersFormServerContainer } from "@/components/projects/ProjectFiltersFormServerContainer";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
});

export default async function AppProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  // Authorization
  await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize } = searchParamsSchema.parse(rawParams);

  // Get count
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
