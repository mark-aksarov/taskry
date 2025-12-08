import { ProjectsPage } from "./ProjectsPage";
import { getProjectList } from "@/lib/queries/project";
import { ProjectsPageEmpty } from "./ProjectsPageEmpty";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";
import { ProjectsServerContainer } from "@/components/projects/ProjectsServerContainer";
import { NewProjectFormServerContainer } from "@/components/projects/NewProjectFormServerContainer";
import { ProjectFiltersFormServerContainer } from "@/components/projects/ProjectFiltersFormServerContainer";

export default async function AppProjectsPage() {
  const workspaceId = await getUserWorkspaceId();
  const projects = await getProjectList({ workspaceId });

  if (!projects.length) return <ProjectsPageEmpty />;

  return (
    <ProjectsPage
      ProjectFiltersFormContainer={ProjectFiltersFormServerContainer}
      ProjectsServerContainer={ProjectsServerContainer}
      NewProjectFormContainer={NewProjectFormServerContainer}
    />
  );
}
