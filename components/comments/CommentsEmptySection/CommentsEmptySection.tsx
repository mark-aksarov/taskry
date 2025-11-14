import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

export function CommentsEmptySection() {
  return (
    <div className="flex min-h-[400px] flex-auto items-center justify-center">
      <EmptySection className="max-w-[375px]">
        <EmptySectionHeading tag="h3" className="max-md:text-3xl md:text-4xl">
          No comments yet?
        </EmptySectionHeading>
        <EmptySectionDescription>
          No comments yet. Add the first one to share updates, ask a question,
          or start a discussion about this task.
        </EmptySectionDescription>
      </EmptySection>
    </div>
  );
}
