import { Card } from "../../common/Card";
import { getTasks } from "@/lib/queries/task";
import { PageSection } from "../../common/PageSection";
import { PageSectionHeading } from "../../common/PageSectionHeading";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "../../common/EmptySection";
import { Suspense } from "react";
import { TaskList } from "../TaskList";
import { ListSkeleton } from "../../common/ListSkeleton";
import { TaskItem } from "../TaskItem";

export async function AssignedTasks() {
  const tasks = await getTasks();

  if (!tasks.length) {
    return (
      <Card className="md:relative md:flex-1">
        <div className="flex w-full items-center justify-center p-8 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          <EmptySection>
            <EmptySectionHeading
              tag="h2"
              className="max-md:text-3xl md:text-4xl"
            >
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

  return (
    <PageSection>
      <PageSectionHeading>Assigned Tasks</PageSectionHeading>
      <Suspense
        fallback={<ListSkeleton items={10} renderItem={() => <TaskItem />} />}
      >
        <TaskList tasks={tasks} />
      </Suspense>
    </PageSection>
  );
}
