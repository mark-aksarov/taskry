import { z } from "zod";
import { DashboardPage } from "./DashboardPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { NewTaskFormServerContainer } from "@/components/tasks/NewTaskFormServerContainer";
import { EditTaskFormClientContainer } from "@/components/tasks/EditTaskFormClientContainer";
import { AssignedTasksServerContainer } from "@/components/tasks/AssignedTasksServerContainer";
import { TotalTasksCardServerContainer } from "@/components/tasks/TotalTasksCardServerContainer";
import { TotalUsersCardServerContainer } from "@/components/users/TotalUsersCardServerContainer";
import { TotalProjectsCardServerContainer } from "@/components/projects/TotalProjectsCardServerContainer";
import { TotalCustomersCardServerContainer } from "@/components/customer/TotalCustomersCardServerContainer";
import { EditTaskFormClientContainerProvider } from "@/components/tasks/EditTaskFormClientContainerContext";

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
    <EditTaskFormClientContainerProvider value={EditTaskFormClientContainer}>
      <DashboardPage
        page={page}
        pageSize={pageSize}
        NewTaskFormContainer={NewTaskFormServerContainer}
        TotalProjectsCardContainer={TotalProjectsCardServerContainer}
        TotalTasksCardContainer={TotalTasksCardServerContainer}
        TotalUsersCardContainer={TotalUsersCardServerContainer}
        TotalCustomersCardContainer={TotalCustomersCardServerContainer}
        AssignedTasksContainer={AssignedTasksServerContainer}
      />
    </EditTaskFormClientContainerProvider>
  );
}
