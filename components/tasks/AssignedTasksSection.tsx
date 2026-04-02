import { AssignedTasksSectionHeading } from "./AssignedTasksSectionHeading";

interface AssignedTasksSectionProps {
  createTaskButton: React.ReactNode;
  tasksContainer: React.ReactNode;
}

export function AssignedTasksSection({
  createTaskButton,
  tasksContainer,
}: AssignedTasksSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <AssignedTasksSectionHeading />
        {createTaskButton}
      </div>
      {tasksContainer}
    </section>
  );
}
