import { z } from "zod";
import { ProjectsPage } from "./ProjectsPage";
import { arrayParam } from "@/lib/utils/arrayParam";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { ProjectStatus } from "@/generated/prisma/enums";
import { getProjectCount } from "@/lib/data/project/project.dal";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { updateProjectStatuses } from "@/lib/actions/project/updateProjectStatuses";
import { ProjectsServerContainer } from "@/components/projects/ProjectsServerContainer";
import { createProjectCategory } from "@/lib/actions/projectCategory/createProjectCategory";
import { NewProjectFormServerContainer } from "@/components/projects/NewProjectFormServerContainer";
import { EditProjectFormClientContainer } from "@/components/projects/EditProjectFormClientContainer";
import { ProjectFiltersFormServerContainer } from "@/components/projects/ProjectFiltersFormServerContainer";
import { EditProjectFormClientContainerProvider } from "@/components/projects/EditProjectFormClientContainerContext";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
  sort: z.enum(["title", "deadline", "status", "category"]).catch("title"),
  status: arrayParam(z.enum(ProjectStatus)).catch([]),
  category: arrayParam(z.coerce.number()).catch([]),
  customer: arrayParam(z.coerce.number()).catch([]),
  user: arrayParam(z.string()).catch([]),
  deadline: z
    .enum(["today", "tomorrow", "overdue"])
    .optional()
    .catch(undefined),
  dateStart: z.string().optional().catch(undefined),
  dateEnd: z.string().optional().catch(undefined),
  noActiveTasks: z
    .preprocess((val) => val === "true", z.boolean())
    .optional()
    .catch(undefined),
});

export default async function AppProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Authorization
  await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const validated = searchParamsSchema.parse(rawParams);
  const { page, pageSize, sort, ...filters } = validated;

  // Get count
  const projectCount = await getProjectCount();

  if (!projectCount) return <ProjectsPageEmpty />;

  return (
    <EditProjectFormClientContainerProvider
      value={EditProjectFormClientContainer}
    >
      <ProjectsPage
        page={page}
        pageSize={pageSize}
        sort={sort}
        filters={filters}
        createProjectCategoryAction={createProjectCategory}
        deleteProjectsAction={deleteProjects}
        updateProjectStatusesAction={updateProjectStatuses}
        ProjectFiltersFormContainer={ProjectFiltersFormServerContainer}
        ProjectsServerContainer={ProjectsServerContainer}
        NewProjectFormContainer={NewProjectFormServerContainer}
      />
    </EditProjectFormClientContainerProvider>
  );
}
