import DashboardTemplate from "./DashboardTemplate";
import { ProfileLinkContainer } from "@/components/layout/ProfileLinkContainer";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";

interface DashboardTemplateProps {
  children: React.ReactNode;
}

export default function AppDashboardTemplate({
  children,
}: DashboardTemplateProps) {
  return (
    <DashboardTemplate
      tasksSearchContainer={<TasksSearchContainer />}
      projectsSearchContainer={<ProjectsSearchContainer />}
      profileLinkContainer={<ProfileLinkContainer />}
    >
      {children}
    </DashboardTemplate>
  );
}
