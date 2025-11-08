import {
  EmptySection,
  EmptySectionButton,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { PageContainer } from "@/components/common/PageContainer";

export function ProjectsPageEmpty() {
  return (
    <PageContainer fullscreen centered>
      <EmptySection>
        <EmptySectionHeading>No projects yet</EmptySectionHeading>
        <EmptySectionDescription>
          Create a new project to keep track of your work
        </EmptySectionDescription>
        <EmptySectionButton href="#">New Project</EmptySectionButton>
      </EmptySection>
    </PageContainer>
  );
}
