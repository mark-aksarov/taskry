import { ProjectItemType, ProjectListItem } from "../ProjectListItem";
import { List } from "@/components/common/List";

interface ProjectListProps {
  projects: ProjectItemType[];
  showCheckbox?: boolean;
}

export function ProjectList({
  projects,
  showCheckbox = true,
}: ProjectListProps) {
  return (
    <List>
      {projects.map((project) => (
        <ProjectListItem
          key={project.id}
          project={project}
          showCheckbox={showCheckbox}
        />
      ))}
    </List>
  );
}
