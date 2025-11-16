import { DashboardPage } from "./DashboardPage";
import { TotalTasksCardContainer } from "@/components/tasks/TotalTasksCard";
import { TotalProjectsCardContainer } from "@/components/projects/TotalProjectsCard";
import { TotalCustomersCardContainer } from "@/components/customer/TotalCustomersCard";
import { AssignedTasksContainer } from "@/components/tasks/AssignedTasks";
import { TotalUsersCardContainer } from "@/components/users/TotalUsersCard";
import { TaskDetailContainerProvider } from "@/components/tasks/TaskDetail";
import { TaskCommentsContainerProvider } from "@/components/tasks/TaskCommentsContainer";

export default function AppDashboardPage() {
  return (
    <TaskDetailContainerProvider>
      <TaskCommentsContainerProvider>
        <DashboardPage
          TotalProjectsCardContainer={TotalProjectsCardContainer}
          TotalTasksCardContainer={TotalTasksCardContainer}
          TotalUsersCardContainer={TotalUsersCardContainer}
          TotalCustomersCardContainer={TotalCustomersCardContainer}
          AssignedTasksContainer={AssignedTasksContainer}
        />
      </TaskCommentsContainerProvider>
    </TaskDetailContainerProvider>
  );
}
