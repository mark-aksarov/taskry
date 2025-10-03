import { getProjects } from "@/lib/queries/project";
import { ProjectGridItem } from "../ProjectGridItem/ProjectGridItem";

export async function ProjectGrid() {
  const projects = await getProjects();

  return (
    <div className="@container">
      <div className="grid gap-4 @max-3xl:grid-cols-2 @3xl:@max-5xl:grid-cols-3 @5xl:@max-7xl:grid-cols-4 @7xl:grid-cols-5">
        {projects.map((project) => (
          <ProjectGridItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
