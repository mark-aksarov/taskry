import UsersTemplate from "./UsersTemplate";
import { SearchModal } from "@/components/search/SearchModal";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";

interface UsersTemplateProps {
  children: React.ReactNode;
}

export default async function AppUsersTemplate({
  children,
}: UsersTemplateProps) {
  return (
    <UsersTemplate
      searchModal={
        <SearchModal
          tasksSearchContainer={<TasksSearchContainer />}
          projectsSearchContainer={<ProjectsSearchContainer />}
        />
      }
    >
      {children}
    </UsersTemplate>
  );
}
