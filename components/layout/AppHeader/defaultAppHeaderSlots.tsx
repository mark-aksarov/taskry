import { ProfileLinkContainer } from "@/components/layout/ProfileLinkContainer";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";

export const defaultAppHeaderSlots = {
  tasksSearchContainer: <TasksSearchContainer />,
  projectsSearchContainer: <ProjectsSearchContainer />,
  profileLinkContainer: <ProfileLinkContainer />,
};
