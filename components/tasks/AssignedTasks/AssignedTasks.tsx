import { Card } from "@/components/common/Card";
import {
  EmptySection,
  EmptySectionDescription,
  EmptySectionHeading,
  EmptySectionLink,
} from "@/components/common/EmptySection";
import { Repeat } from "@/components/common/Repeat";
import { PageSection } from "@/components/common/PageSection";
import { PageSectionHeading } from "@/components/common/PageSectionHeading";
import { getTasks } from "@/lib/queries/task";
import { Suspense } from "react";
import { TaskList } from "../TaskList";
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
    <section className="flex flex-col gap-4">
      <h2 className="text-base font-bold text-black dark:text-white">
        Assigned Tasks
      </h2>
      <Suspense
        fallback={<Repeat items={10} renderItem={() => <TaskItem />} />}
      >
        <TaskList tasks={tasks} />
      </Suspense>
    </section>
  );
}
