import ProfileTemplate from "./ProfileTemplate";
import { SearchModal } from "@/components/search/SearchModal";
import { TasksSearchContainer } from "@/components/search/TasksSearchContainer";
import { ProjectsSearchContainer } from "@/components/search/ProjectsSearchContainer";

interface ProfileTemplateProps {
  children: React.ReactNode;
}

export default async function AppProfileTemplate({
  children,
}: ProfileTemplateProps) {
  return (
    <ProfileTemplate
      searchModal={
        <SearchModal
          tasksSearchContainer={<TasksSearchContainer />}
          projectsSearchContainer={<ProjectsSearchContainer />}
        />
      }
    >
      {children}
    </ProfileTemplate>
  );
}
