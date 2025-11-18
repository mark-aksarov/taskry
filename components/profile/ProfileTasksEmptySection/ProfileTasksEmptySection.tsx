import {
  EmptySection,
  EmptySectionButton,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

export function ProfileTasksEmptySection() {
  return (
    <div className="flex flex-auto items-center justify-center">
      <EmptySection>
        <EmptySectionHeading className="max-md:text-3xl md:text-4xl">
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
