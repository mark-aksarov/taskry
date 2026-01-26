import { z } from "zod";
import { ProjectsPage } from "./ProjectsPage";
import { arrayParam } from "@/lib/utils/arrayParam";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { ProjectStatus } from "@/generated/prisma/enums";
import { getProjectCount } from "@/lib/data/project/project.dal";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectsContainer } from "@/components/projects/ProjectsContainer";
import { updateProjectStatuses } from "@/lib/actions/project/updateProjectStatuses";
import { ProjectCategoryFormBase } from "@/components/projects/ProjectCategoryFormBase";
import { NewProjectFormContainer } from "@/components/projects/NewProjectFormContainer";
import { createProjectCategory } from "@/lib/actions/projectCategory/createProjectCategory";
import { ProjectFiltersFormContainer } from "@/components/projects/ProjectFiltersFormContainer";
import { ProjectToolbarActionsMenuTrigger } from "@/components/projects/ProjectToolbarActionsMenuTrigger";
import { ProjectToolbarFiltersModalTrigger } from "@/components/projects/ProjectToolbarFiltersModalTrigger";
import { ProjectToolbarCreateNewMenuTrigger } from "@/components/projects/ProjectToolbarCreateNewMenuTrigger";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
  sort: z.enum(["title", "deadline", "status", "category"]).catch("title"),
  status: arrayParam(z.enum(ProjectStatus)).catch([]),
  category: arrayParam(z.coerce.number()).catch([]),
  customer: arrayParam(z.coerce.number()).catch([]),
  user: arrayParam(z.string()).catch([]),
  deadline: z
    .enum(["today", "tomorrow", "thisWeek", "overdue"])
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

  if (!projectCount) {
    return (
      <ProjectsPageEmpty
        newProjectFormContainer={<NewProjectFormContainer />}
      />
    );
  }

  return (
    <ProjectsPage
      projectsContainer={
        <ProjectsContainer
          page={page}
          pageSize={pageSize}
          sort={sort}
          filters={filters}
        />
      }
      projectToolbarCreateNewMenuTrigger={
        <ProjectToolbarCreateNewMenuTrigger
          newProjectFormContainer={<NewProjectFormContainer />}
          newProjectCategoryForm={
            <ProjectCategoryFormBase formAction={createProjectCategory} />
          }
        />
      }
      projectToolbarFiltersModalTrigger={
        <ProjectToolbarFiltersModalTrigger
          filtersFormContainer={
            <ProjectFiltersFormContainer filters={filters} />
          }
        />
      }
      projectToolbarActionsMenuTrigger={
        <ProjectToolbarActionsMenuTrigger
          deleteAction={deleteProjects}
          updateStatusAction={updateProjectStatuses}
        />
      }
    />
  );
}
