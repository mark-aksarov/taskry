import {
  pageSearchParam,
  dateSearchParam,
  booleanSearchParam,
  searchParamToArray,
  pageSizeSearchParam,
} from "@/lib/schemas/base";

import {
  getProjectCount,
  getProjectList,
} from "@/lib/data/project/project.dal";

import { z } from "zod";
import { userId } from "@/lib/schemas/user";
import { ProjectsPage } from "./ProjectsPage";
import { projectSortFields } from "@/lib/types";
import { customerId } from "@/lib/schemas/customer";
import { projectStatus } from "@/lib/schemas/project";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { hasOwnerRole } from "@/lib/utils/hasOwnerRole";
import { projectCategoryId } from "@/lib/schemas/projectCategory";
import { createProject } from "@/lib/actions/project/createProject";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectsContainer } from "@/components/projects/ProjectsContainer";
import { CurrentUserProvider } from "@/components/common/CurrentUserContext";
import { CreateProjectProvider } from "@/components/projects/CreateProjectContext";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";
import { updateProjectStatuses } from "@/lib/actions/project/updateProjectStatuses";
import { DeleteProjectsProvider } from "@/components/projects/DeleteProjectsContext";
import { NewProjectFormContainer } from "@/components/projects/NewProjectFormContainer";
import { SelectedProjectsProvider } from "@/components/projects/SelectedProjectsContext";
import { createProjectCategory } from "@/lib/actions/projectCategory/createProjectCategory";
import { ProjectFiltersFormContainer } from "@/components/projects/ProjectFiltersFormContainer";
import { UpdateProjectStatusesProvider } from "@/components/projects/UpdateProjectStatusesContext";
import { CreateProjectCategoryProvider } from "@/components/projectCategory/CreateProjectCategoryContext";

const searchParamsSchema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  deadlineFrom: dateSearchParam,
  deadlineTo: dateSearchParam,
  noActiveTasks: booleanSearchParam,
  sort: z.enum(projectSortFields).catch("createdAt"),
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
  const session = await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const validated = searchParamsSchema.parse(rawParams);
  const { page, pageSize, sort, ...filters } = validated;

  // This data is required to determine the user's role
  // and render the UI accordingly on the client side.
  const currentUserContextValue = {
    isGuest: await hasGuestRole(),
    isOwner: await hasOwnerRole(),
    userId: session.user.id,
  };

  // Render the empty page if there are no projects
  const totalCount = await getProjectCount();

  // Get projects for the current page based on filters and sorting
  const { items: projects, totalCount: totalFilteredProjects } =
    await getProjectList({
      page,
      pageSize,
      sort,
      filters,
    });

  return (
    <CurrentUserProvider value={currentUserContextValue}>
      <UpdateProjectStatusesProvider
        updateProjectStatuses={updateProjectStatuses}
      >
        <SelectedProjectsProvider
          pageItems={projects.map((p) => ({ id: p.id, status: p.status }))}
        >
          <PageTransitionProvider>
            <DeleteProjectsProvider deleteProjects={deleteProjects}>
              <CreateProjectCategoryProvider
                createProjectCategory={createProjectCategory}
              >
                <CreateProjectProvider createProject={createProject}>
                  <ProjectsPage
                    totalCount={totalCount}
                    newProjectFormContainer={<NewProjectFormContainer />}
                    totalFilteredProjects={totalFilteredProjects}
                    selectedSortField={sort}
                    projectsContainer={
                      <ProjectsContainer
                        projects={projects}
                        totalCount={totalFilteredProjects}
                        page={page}
                        pageSize={pageSize}
                      />
                    }
                    projectFiltersFormContainer={
                      <ProjectFiltersFormContainer filters={filters} />
                    }
                  />
                </CreateProjectProvider>
              </CreateProjectCategoryProvider>
            </DeleteProjectsProvider>
          </PageTransitionProvider>
        </SelectedProjectsProvider>
      </UpdateProjectStatusesProvider>
    </CurrentUserProvider>
  );
}
