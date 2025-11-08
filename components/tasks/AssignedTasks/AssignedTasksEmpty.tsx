import { Card } from "@/components/common/Card";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionButton,
} from "@/components/common/EmptySection";
import { AssignedTasksSection } from "./AssignedTasksSection";
import { AssignedTasksSectionHeading } from "./AssignedTasksSectionHeading";

export function AssignedTasksEmpty() {
  return (
    <AssignedTasksSection>
      <AssignedTasksSectionHeading />
      <Card>
        <div className="flex items-center justify-center p-8 max-md:h-[17rem] md:h-[25rem]">
          <EmptySection>
            <EmptySectionHeading className="max-md:text-3xl md:text-4xl">
              No tasks yet
            </EmptySectionHeading>
            <EmptySectionDescription>
              Create a new task to keep track of your work
            </EmptySectionDescription>
            <EmptySectionButton href="#">New Task</EmptySectionButton>
          </EmptySection>
        </div>
      </Card>
    </AssignedTasksSection>
  );
}
