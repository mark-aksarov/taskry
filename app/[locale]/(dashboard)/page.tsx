import { z } from "zod";
import { DashboardPage } from "./DashboardPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { AssignedTasksServerContainer } from "@/components/tasks/AssignedTasksServerContainer";
import { TotalTasksCardServerContainer } from "@/components/tasks/TotalTasksCardServerContainer";
import { TotalUsersCardServerContainer } from "@/components/users/TotalUsersCardServerContainer";
import { TotalProjectsCardServerContainer } from "@/components/projects/TotalProjectsCardServerContainer";
import { TotalCustomersCardServerContainer } from "@/components/customer/TotalCustomersCardServerContainer";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
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
      page={page}
      pageSize={pageSize}
      TotalProjectsCardContainer={TotalProjectsCardServerContainer}
      TotalTasksCardContainer={TotalTasksCardServerContainer}
      TotalUsersCardContainer={TotalUsersCardServerContainer}
      TotalCustomersCardContainer={TotalCustomersCardServerContainer}
      AssignedTasksContainer={AssignedTasksServerContainer}
    />
  );
}
