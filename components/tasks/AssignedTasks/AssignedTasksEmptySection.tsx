import { AssignedTasksSection } from "./AssignedTasksSection";
import { AssignedTasksEmptyCard } from "./AssignedTasksEmptyCard";
import { AssignedTasksSectionHeading } from "./AssignedTasksSectionHeading";

export function AssignedTasksEmptySection() {
  return (
    <AssignedTasksSection>
      <AssignedTasksSectionHeading />
      <AssignedTasksEmptyCard />
    </AssignedTasksSection>
  );
}
