import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionButton,
} from "@/components/common/EmptySection";

export function ProfileTasksDesktopEmpty() {
  return (
    <div className="flex flex-auto items-center justify-center max-md:hidden">
      <EmptySection>
        <EmptySectionHeading className="md:text-4xl">
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
