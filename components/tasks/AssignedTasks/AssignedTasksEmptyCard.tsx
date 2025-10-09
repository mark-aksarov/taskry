import { Card } from "@/components/common/Card";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";

export function AssignedTasksEmptyCard() {
  return (
    <Card className="md:relative md:flex-1">
      <div className="flex w-full items-center justify-center p-8 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <EmptySection>
          <EmptySectionHeading tag="h2" className="max-md:text-3xl md:text-4xl">
            No tasks yet
          </EmptySectionHeading>
          <EmptySectionDescription>
            Create a new task to keep track of your work
          </EmptySectionDescription>
          <EmptySectionLink href="#">New Task</EmptySectionLink>
        </EmptySection>
      </div>
    </Card>
  );
}
