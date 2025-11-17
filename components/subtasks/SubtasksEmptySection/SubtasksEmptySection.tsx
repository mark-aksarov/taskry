import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

export function SubtasksEmptySection() {
  return (
    <div className="flex min-h-[400px] flex-auto items-center justify-center">
      <EmptySection className="max-w-[375px]">
        <EmptySectionHeading tag="h3" className="max-md:text-3xl md:text-4xl">
          No subtasks yet?
        </EmptySectionHeading>
        <EmptySectionDescription>
          This task doesn’t have any subtasks yet. Add the first one to break
          the work down and track progress more easily.
        </EmptySectionDescription>
      </EmptySection>
    </div>
  );
}
