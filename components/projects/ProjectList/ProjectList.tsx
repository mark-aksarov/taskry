import { ProjectPreview } from "@/lib/queries/types";
import { ProjectItem } from "../ProjectItem";

export function ProjectList({ projects }: { projects: ProjectPreview[] }) {
  return (
    <div className="flex flex-col gap-2">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} showCheckbox />
      ))}
    </div>
  );
}
