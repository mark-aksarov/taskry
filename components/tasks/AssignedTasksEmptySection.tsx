import { TasksEmptySection } from "./TasksEmptySection";

export function AssignedTasksEmptySection() {
  return (
    <div className="flex h-[25rem] items-center justify-center">
      <TasksEmptySection headingClassName="max-md:text-3xl md:text-4xl" />
    </div>
  );
}
