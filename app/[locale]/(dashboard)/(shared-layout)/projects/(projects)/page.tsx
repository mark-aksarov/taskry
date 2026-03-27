import {
  pageSearchParam,
  dateSearchParam,
  booleanSearchParam,
  searchParamToArray,
  pageSizeSearchParam,
  searchQueryParam,
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
import { ProjectsPageProviders } from "./ProjectsPageProviders";
import { projectCategoryId } from "@/lib/schemas/projectCategory";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectsContainer } from "@/components/projects/ProjectsContainer";
import { ProjectCreatorFiltersFormContainer } from "@/components/projects/ProjectCreatorFiltersFormContainer";
import { ProjectCategoryFiltersFormContainer } from "@/components/projects/ProjectCategoryFiltersFormContainer";
import { ProjectCustomerFiltersFormContainer } from "@/components/projects/ProjectCustomerFiltersFormContainer";
import { ProjectsPageModals } from "./ProjectsPageModals";

const searchParamsSchema = z.object({
  query: searchQueryParam,
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  deadlineFrom: dateSearchParam,
  deadlineTo: dateSearchParam,
  noActiveTasks: booleanSearchParam,
  sort: z.enum(projectSortFields).catch("createdAt"),
  statuses: z.preprocess(
    searchParamToArray,
    z.array(projectStatus).optional().catch(undefined),
  ),
  categoryIds: z.preprocess(
    searchParamToArray,
    z.array(projectCategoryId).optional().catch(undefined),
  ),
  customerIds: z.preprocess(
    searchParamToArray,
    z.array(customerId).optional().catch(undefined),
  ),
  creatorIds: z.preprocess(
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
    <ProjectsPageProviders pageItems={projects} filters={filters}>
      <ProjectsPage
        totalCount={totalCount}
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
      />

      <ProjectsPageModals />
    </ProjectsPageProviders>
  );
}
