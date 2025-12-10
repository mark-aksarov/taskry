import { DashboardPage } from "./DashboardPage";
import { getPageParams } from "@/lib/utils/getPageParams";
import { AssignedTasksServerContainer } from "@/components/tasks/AssignedTasksServerContainer";
import { TotalTasksCardServerContainer } from "@/components/tasks/TotalTasksCardServerContainer";
import { TotalUsersCardServerContainer } from "@/components/users/TotalUsersCardServerContainer";
import { TotalProjectsCardServerContainer } from "@/components/projects/TotalProjectsCardServerContainer";
import { TotalCustomersCardServerContainer } from "@/components/customer/TotalCustomersCardServerContainer";

export default async function AppDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const params = await searchParams;
  const { page, pageSize } = getPageParams(params);

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
