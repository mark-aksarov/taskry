import { z } from "zod";
import { DashboardPage } from "./DashboardPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { pageSearchParam, pageSizeSearchParam } from "@/lib/schemas/base";
import { AssignedTasksContainer } from "@/components/tasks/AssignedTasksContainer";
import { TotalTasksCardContainer } from "@/components/tasks/TotalTasksCardContainer";
import { TotalUsersCardContainer } from "@/components/users/TotalUsersCardContainer";
import { TotalProjectsCardContainer } from "@/components/projects/TotalProjectsCardContainer";
import { TotalCustomersCardContainer } from "@/components/customer/TotalCustomersCardContainer";

const searchParamsSchema = z.object({
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
});

export default async function AppDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  // Authorization
  await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const { page, pageSize } = searchParamsSchema.parse(rawParams);

  return (
    <DashboardPage
      totalProjectsCardContainer={<TotalProjectsCardContainer />}
      totalTasksCardContainer={<TotalTasksCardContainer />}
      totalUsersCardContainer={<TotalUsersCardContainer />}
      totalCustomersCardContainer={<TotalCustomersCardContainer />}
      assignedTasksContainer={
        <AssignedTasksContainer page={page} pageSize={pageSize} />
      }
    />
  );
}
