import ProjectsTemplate from "./ProjectsTemplate";
import { SearchModal } from "@/components/search/SearchModal";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";

interface ProjectsTemplateProps {
  children: React.ReactNode;
}

export default async function AppProjectsTemplate({
  children,
}: ProjectsTemplateProps) {
  return (
    <ProjectsTemplate
      searchModal={
        <SearchModal
          tasksSearchContainer={<TasksSearchContainer />}
          projectsSearchContainer={<ProjectsSearchContainer />}
        />
      }
    >
      {children}
    </ProjectsTemplate>
  );
}
