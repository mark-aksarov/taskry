import { Card } from "@/components/common/Card";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";

export function AssignedTasksEmptyCard() {
  return (
    <Card>
      <div className="flex items-center justify-center p-8 max-md:w-[17rem] md:h-[25rem]">
        <EmptySection>
          <EmptySectionHeading className="max-md:text-3xl md:text-4xl">
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
