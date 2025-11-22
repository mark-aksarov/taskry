import {
  EmptySection,
  EmptySectionButton,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

export function UserTasksEmptySection() {
  return (
    <div className="flex flex-auto items-center justify-center">
      <EmptySection>
        <EmptySectionHeading className="text-3xl!">
          No assigned tasks yet
        </EmptySectionHeading>
        <EmptySectionDescription>
          Create a new task to keep track of your work
        </EmptySectionDescription>
        <EmptySectionButton href="#">New Task</EmptySectionButton>
      </EmptySection>
    </div>
  );
}
