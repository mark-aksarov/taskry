import DashboardTemplate from "./DashboardTemplate";
import { SearchModal } from "@/components/search/SearchModal";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";

interface DashboardTemplateProps {
  children: React.ReactNode;
}

export default async function AppDashboardTemplate({
  children,
}: DashboardTemplateProps) {
  return (
    <DashboardTemplate
      searchModal={
        <SearchModal
          tasksSearchContainer={<TasksSearchContainer />}
          projectsSearchContainer={<ProjectsSearchContainer />}
        />
      }
    >
      {children}
    </DashboardTemplate>
  );
}
