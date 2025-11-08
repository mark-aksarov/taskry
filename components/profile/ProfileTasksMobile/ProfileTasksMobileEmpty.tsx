import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionButton,
} from "@/components/common/EmptySection";
import { PageContainer } from "@/components/common/PageContainer";

export function ProfileTasksMobileEmpty() {
  return (
    <PageContainer fullscreen centered className="md:hidden">
      <EmptySection>
        <EmptySectionHeading className="max-md:text-3xl">
          No assigned tasks yet
        </EmptySectionHeading>
        <EmptySectionDescription>
          Create a new task to keep track of your work
        </EmptySectionDescription>
        <EmptySectionButton href="#">New Task</EmptySectionButton>
      </EmptySection>
    </PageContainer>
  );
}
