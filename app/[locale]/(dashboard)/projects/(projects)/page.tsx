import { z } from "zod";
import { ProjectsPage } from "./ProjectsPage";
import { getProjectCount } from "@/lib/dal/project";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectsServerContainer } from "@/components/projects/ProjectsServerContainer";
import { ProjectsSelectionProvider } from "@/components/projects/ProjectsSelectionContext";
import { NewProjectFormServerContainer } from "@/components/projects/NewProjectFormServerContainer";
import { ProjectFiltersFormServerContainer } from "@/components/projects/ProjectFiltersFormServerContainer";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
  sort: z.enum(["title", "deadline", "status", "category"]).catch("title"),
  status: z.string().optional(),
  category: z.string().optional(),
  customer: z.string().optional(),
  user: z.string().optional(),
  deadline: z.string().optional(),
  dateStart: z.string().optional(),
  dateEnd: z.string().optional(),
});

export default async function AppProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    pageSize: string;
    sort?: string;
    status?: string;
    category?: string;
    customer?: string;
    user?: string;
    deadline?: string;
    dateStart?: string;
    dateEnd?: string;
  }>;
}) {
  // Authorization
  await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const {
    page,
    pageSize,
    sort,
    status,
    category,
    customer,
    user,
    deadline,
    dateStart,
    dateEnd,
  } = searchParamsSchema.parse(rawParams);

  // Get count
  const projectCount = await getProjectCount();

  if (!projectCount) return <ProjectsPageEmpty />;

  return (
    <ProjectsSelectionProvider>
      <ProjectsPage
        page={page}
        pageSize={pageSize}
        sort={sort}
        filters={{
          status,
          category,
          customer,
          user,
          deadline,
          dateStart,
          dateEnd,
        }}
        ProjectFiltersFormContainer={ProjectFiltersFormServerContainer}
        ProjectsServerContainer={ProjectsServerContainer}
        NewProjectFormContainer={NewProjectFormServerContainer}
      />
    </ProjectsSelectionProvider>
  );
}
