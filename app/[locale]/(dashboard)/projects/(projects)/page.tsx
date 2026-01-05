import {
  GlobalContainerProvider,
  GlobalContainerContextType,
} from "@/components/layout/GlobalContainerContext";

import { z } from "zod";
import { ProjectsPage } from "./ProjectsPage";
import { arrayParam } from "@/lib/utils/arrayParam";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { ProjectStatus } from "@/generated/prisma/enums";
import { getProjectCount } from "@/lib/data/project/project.dal";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectsContainer } from "@/components/projects/ProjectsContainer";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
import { updateProjectStatuses } from "@/lib/actions/project/updateProjectStatuses";
import { NewProjectFormContainer } from "@/components/projects/NewProjectFormContainer";
import { ProjectCommentsContainer } from "@/components/projects/ProjectCommentsContainer";
import { EditProjectFormContainer } from "@/components/projects/EditProjectFormContainer";
import { createProjectCategory } from "@/lib/actions/projectCategory/createProjectCategory";
import { ProjectFiltersFormContainer } from "@/components/projects/ProjectFiltersFormContainer";
import { ProjectDetailCompactContainer } from "@/components/projects/ProjectDetailCompactContainer";

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

const context: GlobalContainerContextType = {
  EditProjectFormContainer,
  ProjectDetailCompactContainer,
  ProjectCommentsContainer,
  UserDetailContainer,
};

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
      <ProjectsPageEmpty NewProjectFormContainer={NewProjectFormContainer} />
    );
  }

  return (
    <GlobalContainerProvider value={context}>
      <ProjectsPage
        page={page}
        pageSize={pageSize}
        sort={sort}
        filters={filters}
        createProjectCategoryAction={createProjectCategory}
        deleteProjectsAction={deleteProjects}
        updateProjectStatusesAction={updateProjectStatuses}
        ProjectFiltersFormContainer={ProjectFiltersFormContainer}
        ProjectsContainer={ProjectsContainer}
        NewProjectFormContainer={NewProjectFormContainer}
      />
    </GlobalContainerProvider>
  );
}
