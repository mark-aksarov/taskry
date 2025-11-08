import { Grid } from "@/components/common/Grid";
import { ProjectGridItem, ProjectGridItemType } from "../ProjectGridItem";

export function ProjectGrid({ projects }: { projects: ProjectGridItemType[] }) {
  return (
    <Grid>
      {projects.map((project) => (
        <ProjectGridItem key={project.id} project={project} />
      ))}
    </Grid>
  );
}
