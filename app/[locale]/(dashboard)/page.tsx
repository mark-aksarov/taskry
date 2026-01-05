import { z } from "zod";
import { DashboardPage } from "./DashboardPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { EditTaskFormContainer } from "@/components/tasks/EditTaskFormContainer";
import { AssignedTasksContainer } from "@/components/tasks/AssignedTasksContainer";
import { TotalTasksCardContainer } from "@/components/tasks/TotalTasksCardContainer";
import { TotalUsersCardContainer } from "@/components/users/TotalUsersCardContainer";
import { TotalProjectsCardContainer } from "@/components/projects/TotalProjectsCardContainer";
import { TotalCustomersCardContainer } from "@/components/customer/TotalCustomersCardContainer";
import { EditTaskFormContainerProvider } from "@/components/tasks/EditTaskFormContainerContext";

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
    <EditTaskFormContainerProvider value={EditTaskFormContainer}>
      <DashboardPage
        page={page}
        pageSize={pageSize}
        NewTaskFormContainer={NewTaskFormContainer}
        TotalProjectsCardContainer={TotalProjectsCardContainer}
        TotalTasksCardContainer={TotalTasksCardContainer}
        TotalUsersCardContainer={TotalUsersCardContainer}
        TotalCustomersCardContainer={TotalCustomersCardContainer}
        AssignedTasksContainer={AssignedTasksContainer}
      />
    </EditTaskFormContainerProvider>
  );
}
