import {
  EmptySection,
  EmptySectionButton,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { PageContainer } from "@/components/common/PageContainer";

export function TasksPageEmpty() {
  return (
    <PageContainer fullscreen centered>
      <EmptySection>
        <EmptySectionHeading>No tasks yet</EmptySectionHeading>
        <EmptySectionDescription>
          Create a new task to keep track of your work
        </EmptySectionDescription>
        <EmptySectionButton href="#">New Task</EmptySectionButton>
      </EmptySection>
    </PageContainer>
  );
}
