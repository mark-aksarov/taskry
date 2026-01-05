import {
  GlobalContainerProvider,
  GlobalContainerContextType,
} from "@/components/layout/GlobalContainerContext";

import { z } from "zod";
import { DashboardPage } from "./DashboardPage";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
import { NewTaskFormContainer } from "@/components/tasks/NewTaskFormContainer";
import { EditTaskFormContainer } from "@/components/tasks/EditTaskFormContainer";
import { TaskCommentsContainer } from "@/components/tasks/TaskCommentsContainer";
import { AssignedTasksContainer } from "@/components/tasks/AssignedTasksContainer";
import { TotalTasksCardContainer } from "@/components/tasks/TotalTasksCardContainer";
import { TotalUsersCardContainer } from "@/components/users/TotalUsersCardContainer";
import { TaskDetailCompactContainer } from "@/components/tasks/TaskDetailCompactContainer";
import { TotalProjectsCardContainer } from "@/components/projects/TotalProjectsCardContainer";
import { TotalCustomersCardContainer } from "@/components/customer/TotalCustomersCardContainer";
import { ProjectDetailCompactContainer } from "@/components/projects/ProjectDetailCompactContainer";

const searchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(20),
});

const context: GlobalContainerContextType = {
  EditTaskFormContainer,
  TaskDetailCompactContainer,
  TaskCommentsContainer,
  ProjectDetailCompactContainer,
  UserDetailContainer,
};

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
    <GlobalContainerProvider value={context}>
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
    </GlobalContainerProvider>
  );
}
