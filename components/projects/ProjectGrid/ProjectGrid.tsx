import { ProjectGridItem } from "../ProjectGridItem";
import { ProjectPreview } from "@/lib/queries/types";
import { Grid } from "@/components/common/Grid/Grid";

export function ProjectGrid({ projects }: { projects: ProjectPreview[] }) {
  return (
    <Grid>
      {projects.map((project) => (
        <ProjectGridItem key={project.id} project={project} />
      ))}
    </Grid>
  );
}
