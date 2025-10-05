import { ProjectItem } from "../ProjectItem";
import { getProjects } from "@/lib/queries/project";
import {
  EmptyView,
  EmptyViewDescription,
  EmptyViewLink,
  EmptyViewTitle,
} from "@/components/common/EmptyView";

export async function ProjectList() {
  const projects = await getProjects();

  if (!projects.length) {
    return (
      <div className="flex w-full items-center justify-center max-md:py-10 md:py-20">
        <EmptyView>
          <EmptyViewTitle className="text-2xl!">No projects yet</EmptyViewTitle>
          <EmptyViewDescription>
            Create a new project to keep track of your work
          </EmptyViewDescription>
          <EmptyViewLink href="#">New Project</EmptyViewLink>
        </EmptyView>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} showCheckbox />
      ))}
    </div>
  );
}
