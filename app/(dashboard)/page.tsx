import { DashboardPage } from "./DashboardPage";
import { TotalTasksCardContainer } from "@/components/tasks/TotalTasksCard";
import { TotalProjectsCardContainer } from "@/components/projects/TotalProjectsCard";
import { TotalCustomersCardContainer } from "@/components/customer/TotalCustomersCard";
import { AssignedTasksContainer } from "@/components/tasks/AssignedTasks";
import { TotalUsersCardContainer } from "@/components/users/TotalUsersCard";
import { TaskDetailContainerProvider } from "@/components/tasks/TaskDetail";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";

export default function AppDashboardPage() {
  return (
    <TaskDetailContainerProvider>
      <CommentsContainerProvider>
        <DashboardPage
          TotalProjectsCardContainer={TotalProjectsCardContainer}
          TotalTasksCardContainer={TotalTasksCardContainer}
          TotalUsersCardContainer={TotalUsersCardContainer}
          TotalCustomersCardContainer={TotalCustomersCardContainer}
          AssignedTasksContainer={AssignedTasksContainer}
        />
      </CommentsContainerProvider>
    </TaskDetailContainerProvider>
  );
}
