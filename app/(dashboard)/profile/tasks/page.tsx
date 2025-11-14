import { ProfileTasksPage } from "./ProfileTasksPage";
import { TaskDetailContainerProvider } from "@/components/tasks/TaskDetail";
import { ProfileHeaderContainer } from "@/components/profile/ProfileHeader";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";
import { ProfileTasksMobileContainer } from "@/components/profile/ProfileTasksMobile";
import { ProfileTasksDesktopContainer } from "@/components/profile/ProfileTasksDesktop";

export default async function AppProfileTasksPage() {
  return (
    <TaskDetailContainerProvider>
      <CommentsContainerProvider>
        <ProfileTasksPage
          ProfileTasksDesktopContainer={ProfileTasksDesktopContainer}
          ProfileTasksMobileContainer={ProfileTasksMobileContainer}
          ProfileHeaderContainer={ProfileHeaderContainer}
        />
      </CommentsContainerProvider>
    </TaskDetailContainerProvider>
  );
}
