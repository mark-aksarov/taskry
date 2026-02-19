import CustomersTemplate from "./CustomersTemplate";
import { SearchModal } from "@/components/search/SearchModal";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";

interface CustomersTemplateProps {
  children: React.ReactNode;
}

export default async function AppCustomersTemplate({
  children,
}: CustomersTemplateProps) {
  return (
    <CustomersTemplate
      searchModal={
        <SearchModal
          tasksSearchContainer={<TasksSearchContainer />}
          projectsSearchContainer={<ProjectsSearchContainer />}
        />
      }
    >
      {children}
    </CustomersTemplate>
  );
}
