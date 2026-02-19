import CompaniesTemplate from "./CompaniesTemplate";
import { SearchModal } from "@/components/search/SearchModal";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";

interface CompaniesTemplateProps {
  children: React.ReactNode;
}

export default async function AppCompaniesTemplate({
  children,
}: CompaniesTemplateProps) {
  return (
    <CompaniesTemplate
      searchModal={
        <SearchModal
          tasksSearchContainer={<TasksSearchContainer />}
          projectsSearchContainer={<ProjectsSearchContainer />}
        />
      }
    >
      {children}
    </CompaniesTemplate>
  );
}
