import ProjectCategoriesTemplate from "./ProjectCategoriesTemplate";
import { SearchModal } from "@/components/search/SearchModal";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";

interface ProjectCategoriesTemplateProps {
  children: React.ReactNode;
}

export default async function AppProjectCategoriesTemplate({
  children,
}: ProjectCategoriesTemplateProps) {
  return (
    <ProjectCategoriesTemplate
      searchModal={
        <SearchModal
          tasksSearchContainer={<TasksSearchContainer />}
          projectsSearchContainer={<ProjectsSearchContainer />}
        />
      }
    >
      {children}
    </ProjectCategoriesTemplate>
  );
}
