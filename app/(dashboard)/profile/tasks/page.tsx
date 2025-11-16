import { ProfileTasksPage } from "./ProfileTasksPage";
import { TaskDetailContainerProvider } from "@/components/tasks/TaskDetail";
import { ProfileHeaderContainer } from "@/components/profile/ProfileHeader";
import { ProfileTasksMobileContainer } from "@/components/profile/ProfileTasksMobile";
import { ProfileTasksDesktopContainer } from "@/components/profile/ProfileTasksDesktop";
import { TaskCommentsContainerProvider } from "@/components/tasks/TaskCommentsContainer";

export default async function AppProfileTasksPage() {
  return (
    <TaskDetailContainerProvider>
      <TaskCommentsContainerProvider>
        <ProfileTasksPage
          ProfileTasksDesktopContainer={ProfileTasksDesktopContainer}
          ProfileTasksMobileContainer={ProfileTasksMobileContainer}
          ProfileHeaderContainer={ProfileHeaderContainer}
        />
      </TaskCommentsContainerProvider>
    </TaskDetailContainerProvider>
  );
}
