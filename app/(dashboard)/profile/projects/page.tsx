import { Centered } from "@/components/common/Centered";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";
import { ProjectList } from "@/components/projects/ProjectList";
import { getProjects } from "@/lib/queries/project";

export default async function ProfileProjectsPage() {
  const projects = await getProjects("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  if (!projects.length) {
    return (
      <Centered>
        <EmptySection>
          <EmptySectionHeading>No projects yet</EmptySectionHeading>
          <EmptySectionDescription>
            Create a new project to keep track of your work
          </EmptySectionDescription>
          <EmptySectionLink href="#">New Project</EmptySectionLink>
        </EmptySection>
      </Centered>
    );
  }

  return <ProjectList projects={projects} showCheckbox={false} />;
}
