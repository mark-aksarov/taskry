import PositionsTemplate from "./PositionsTemplate";
import { SearchModal } from "@/components/search/SearchModal";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";

interface PositionsTemplateProps {
  children: React.ReactNode;
}

export default async function AppPositionsTemplate({
  children,
}: PositionsTemplateProps) {
  return (
    <PositionsTemplate
      searchModal={
        <SearchModal
          tasksSearchContainer={<TasksSearchContainer />}
          projectsSearchContainer={<ProjectsSearchContainer />}
        />
      }
    >
      {children}
    </PositionsTemplate>
  );
}
