import {
  pageSearchParam,
  dateSearchParam,
  arraySearchParam,
  booleanSearchParam,
  pageSizeSearchParam,
  coercedPositiveInt,
} from "@/lib/schemas/base";

import { z } from "zod";
import { ProjectsPage } from "./ProjectsPage";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { ProjectStatus } from "@/generated/prisma/enums";
import { getProjectCount } from "@/lib/data/project/project.dal";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectsContainer } from "@/components/projects/ProjectsContainer";
import { updateProjectStatuses } from "@/lib/actions/project/updateProjectStatuses";
import { NewProjectCategoryForm } from "@/components/projects/NewProjectCategoryForm";
import { NewProjectFormContainer } from "@/components/projects/NewProjectFormContainer";
import { createProjectCategory } from "@/lib/actions/projectCategory/createProjectCategory";
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
  status: arraySearchParam(z.enum(ProjectStatus)),
  category: arraySearchParam(coercedPositiveInt),
  customer: arraySearchParam(coercedPositiveInt),
  user: arraySearchParam(z.string()),
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
            <NewProjectCategoryForm formAction={createProjectCategory} />
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
