import { AssignedTasksEmptyCard } from "./AssignedTasksEmptyCard";
import { AssignedTasksSection } from "./AssignedTasksSection";
import { AssignedTasksSectionHeading } from "./AssignedTasksSectionHeading";

export function AssignedTasksEmptySection({
  newTaskFormContainer,
}: {
  newTaskFormContainer: React.ReactNode;
}) {
  return (
    <AssignedTasksSection>
      <AssignedTasksSectionHeading />
      <AssignedTasksEmptyCard newTaskFormContainer={newTaskFormContainer} />
    </AssignedTasksSection>
  );
}
