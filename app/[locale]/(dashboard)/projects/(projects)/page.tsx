import {
  pageSearchParam,
  dateSearchParam,
  booleanSearchParam,
  searchParamToArray,
  pageSizeSearchParam,
} from "@/lib/schemas/base";

import { z } from "zod";
import { userId } from "@/lib/schemas/user";
import { ProjectsPage } from "./ProjectsPage";
import { customerId } from "@/lib/schemas/customer";
import { projectStatus } from "@/lib/schemas/project";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { getProjectList } from "@/lib/data/project/project.dal";
import { projectCategoryId } from "@/lib/schemas/projectCategory";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectsContainer } from "@/components/projects/ProjectsContainer";
import { updateProjectStatuses } from "@/lib/actions/project/updateProjectStatuses";
import { NewProjectFormContainer } from "@/components/projects/NewProjectFormContainer";
import { SelectedProjectsProvider } from "@/components/projects/SelectedProjectsContext";
import { createProjectCategory } from "@/lib/actions/projectCategory/createProjectCategory";
import { NewProjectCategoryForm } from "@/components/projectCategory/NewProjectCategoryForm";
import { ProjectFiltersFormContainer } from "@/components/projects/ProjectFiltersFormContainer";
import { ProjectToolbarActionsMenuTrigger } from "@/components/projects/ProjectToolbarActionsMenuTrigger";
import { ProjectToolbarFiltersModalTrigger } from "@/components/projects/ProjectToolbarFiltersModalTrigger";
import { ProjectToolbarCreateNewMenuTrigger } from "@/components/projects/ProjectToolbarCreateNewMenuTrigger";

const searchParamsSchema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  deadlineFrom: dateSearchParam,
  deadlineTo: dateSearchParam,
  noActiveTasks: booleanSearchParam,
  sort: z.enum(["title", "deadline", "status", "category"]).catch("title"),
  status: z.preprocess(
    searchParamToArray,
    z.array(projectStatus).optional().catch(undefined),
  ),
  category: z.preprocess(
    searchParamToArray,
    z.array(projectCategoryId).optional().catch(undefined),
  ),
  customer: z.preprocess(
    searchParamToArray,
    z.array(customerId).optional().catch(undefined),
  ),
  user: z.preprocess(
    searchParamToArray,
    z.array(userId).optional().catch(undefined),
  ),
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
  const { items: projects, totalCount } = await getProjectList({
    page,
    pageSize,
    sort,
    filters,
  });

  const guestMode = await hasGuestRole();

  const projectToolbarCreateNewMenuTrigger = (
    <ProjectToolbarCreateNewMenuTrigger
      guestMode={guestMode}
      newProjectFormContainer={<NewProjectFormContainer />}
      newProjectCategoryForm={
        <NewProjectCategoryForm createProjectCategory={createProjectCategory} />
      }
    />
  );

  if (!totalCount) {
    return (
      <ProjectsPageEmpty
        projectToolbarCreateNewMenuTrigger={projectToolbarCreateNewMenuTrigger}
      />
    );
  }

  return (
    <SelectedProjectsProvider
      pageItems={projects.map((p) => ({ id: p.id, status: p.status }))}
    >
      <ProjectsPage
        projectsContainer={
          <ProjectsContainer
            projects={projects}
            totalCount={totalCount}
            page={page}
            pageSize={pageSize}
          />
        }
        projectToolbarCreateNewMenuTrigger={projectToolbarCreateNewMenuTrigger}
        projectToolbarFiltersModalTrigger={
          <ProjectToolbarFiltersModalTrigger
            filtersFormContainer={
              <ProjectFiltersFormContainer filters={filters} />
            }
          />
        }
        projectToolbarActionsMenuTrigger={
          <ProjectToolbarActionsMenuTrigger
            guestMode={guestMode}
            deleteProjects={deleteProjects}
            updateStatusAction={updateProjectStatuses}
          />
        }
      />
    </SelectedProjectsProvider>
  );
}
