import { DashboardPage } from "./DashboardPage";
import { TotalTasksCardContainer } from "@/components/dashboard/TotalTasksCard";
import { TotalProjectsCardContainer } from "@/components/dashboard/TotalProjectsCard";
import { TotalCustomersCardContainer } from "@/components/dashboard/TotalCustomersCard";
import { AssignedTasksContainer } from "@/components/tasks/AssignedTasks";
import { TotalUsersCardContainer } from "@/components/dashboard/TotalUsersCard";
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
