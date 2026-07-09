import { AssignedTasksSectionHeading } from "./AssignedTasksSectionHeading";

interface AssignedTasksSectionProps {
  createTaskButton: React.ReactNode;
  taskGrid: React.ReactNode;
}

export function AssignedTasksSection({
  createTaskButton,
  taskGrid,
}: AssignedTasksSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <AssignedTasksSectionHeading />
        {createTaskButton}
      </div>
      {taskGrid}
    </section>
  );
}
