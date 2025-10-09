import { ProjectPreview } from "@/lib/queries/types";
import { ProjectListItem } from "../ProjectListItem";
import { List } from "@/components/common/List";

export function ProjectList({ projects }: { projects: ProjectPreview[] }) {
  return (
    <List>
      {projects.map((project) => (
        <ProjectListItem key={project.id} project={project} showCheckbox />
      ))}
    </List>
  );
}
