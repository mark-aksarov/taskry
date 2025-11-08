import { ProjectList } from "../ProjectList";
import { ProjectGrid } from "../ProjectGrid";
import { ViewModeContainer } from "@/components/common/ViewMode";
import { getProjects } from "@/lib/queries/project";

export async function ProjectViewModeContainer() {
  const projects = await getProjects();

  return (
    <ViewModeContainer
      list={<ProjectList projects={projects} />}
      grid={<ProjectGrid projects={projects} />}
    />
  );
}
