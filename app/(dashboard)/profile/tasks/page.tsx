import { ProfileTasksPage } from "./ProfileTasksPage";
import { TaskDetailContainerProvider } from "@/components/tasks/TaskDetail";
import { ProfileHeaderContainer } from "@/components/profile/ProfileHeader";
import { ProfileTasksMobileContainer } from "@/components/profile/ProfileTasksMobile";
import { ProfileTasksDesktopContainer } from "@/components/profile/ProfileTasksDesktop";
import { TaskCommentsContainerProvider } from "@/components/tasks/TaskCommentsContainer";
import { UpdateSubtasksFormContainerProvider } from "@/components/subtasks/UpdateSubtasksForm";

export default async function AppProfileTasksPage() {
  return (
    <TaskDetailContainerProvider>
      <TaskCommentsContainerProvider>
        <UpdateSubtasksFormContainerProvider>
          <ProfileTasksPage
            ProfileTasksDesktopContainer={ProfileTasksDesktopContainer}
            ProfileTasksMobileContainer={ProfileTasksMobileContainer}
            ProfileHeaderContainer={ProfileHeaderContainer}
          />
        </UpdateSubtasksFormContainerProvider>
      </TaskCommentsContainerProvider>
    </TaskDetailContainerProvider>
  );
}
