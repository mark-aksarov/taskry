import { DashboardPage } from "./DashboardPage";
import { AssignedTasksServerContainer } from "@/components/tasks/AssignedTasksServerContainer";
import { TotalTasksCardServerContainer } from "@/components/tasks/TotalTasksCardServerContainer";
import { TotalUsersCardServerContainer } from "@/components/users/TotalUsersCardServerContainer";
import { TotalProjectsCardServerContainer } from "@/components/projects/TotalProjectsCardServerContainer";
import { TotalCustomersCardServerContainer } from "@/components/customer/TotalCustomersCardServerContainer";

export default async function AppDashboardPage() {
  return (
    <DashboardPage
      TotalProjectsCardContainer={TotalProjectsCardServerContainer}
      TotalTasksCardContainer={TotalTasksCardServerContainer}
      TotalUsersCardContainer={TotalUsersCardServerContainer}
      TotalCustomersCardContainer={TotalCustomersCardServerContainer}
      AssignedTasksContainer={AssignedTasksServerContainer}
    />
  );
}
