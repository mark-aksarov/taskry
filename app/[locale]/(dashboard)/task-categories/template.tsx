import TaskCategoriesTemplate from "./TaskCategoriesTemplate";
import { SearchModal } from "@/components/search/SearchModal";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";

interface TaskCategoriesTemplateProps {
  children: React.ReactNode;
}

export default async function AppTaskCategoriesTemplate({
  children,
}: TaskCategoriesTemplateProps) {
  return (
    <TaskCategoriesTemplate
      searchModal={
        <SearchModal
          tasksSearchContainer={<TasksSearchContainer />}
          projectsSearchContainer={<ProjectsSearchContainer />}
        />
      }
    >
      {children}
    </TaskCategoriesTemplate>
  );
}
