import TasksTemplate from "./TasksTemplate";
import { SearchModal } from "@/components/search/SearchModal";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";

interface TasksTemplateProps {
  children: React.ReactNode;
}

export default async function AppTasksTemplate({
  children,
}: TasksTemplateProps) {
  return (
    <TasksTemplate
      searchModal={
        <SearchModal
          tasksSearchContainer={<TasksSearchContainer />}
          projectsSearchContainer={<ProjectsSearchContainer />}
        />
      }
    >
      {children}
    </TasksTemplate>
  );
}
