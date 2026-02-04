import DashboardTemplate from "./DashboardTemplate";
import { SearchModal } from "@/components/search/SearchModal";
import { UsersSearchContainer } from "@/components/search/UsersSearchContainer";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";
import { CustomersSearchContainer } from "@/components/search/CustomersSearchContainer";

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
          usersSearchContainer={<UsersSearchContainer />}
          tasksSearchContainer={<TasksSearchContainer />}
          projectsSearchContainer={<ProjectsSearchContainer />}
          customersSearchContainer={<CustomersSearchContainer />}
        />
      }
    >
      {children}
    </DashboardTemplate>
  );
}
