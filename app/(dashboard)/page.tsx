import { DashboardPage } from "./DashboardPage";
import { TotalTasksCardContainer } from "@/components/dashboard/TotalTasksCard";
import { TotalProjectsCardContainer } from "@/components/dashboard/TotalProjectsCard";
import { TotalCustomersCardContainer } from "@/components/dashboard/TotalCustomersCard";
import { AssignedTasksContainer } from "@/components/tasks/AssignedTasks/AssignedTasksContainer";
import { TotalUsersCardContainer } from "@/components/dashboard/TotalUsersCard";

export default function AppDashboardPage() {
  return (
    <DashboardPage
      TotalProjectsCardContainer={TotalProjectsCardContainer}
      TotalTasksCardContainer={TotalTasksCardContainer}
      TotalUsersCardContainer={TotalUsersCardContainer}
      TotalCustomersCardContainer={TotalCustomersCardContainer}
      AssignedTasksContainer={AssignedTasksContainer}
    />
  );
}
