import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { TaskListItemSkeleton } from "../TaskListItem";
import { AssignedTasksSection } from "./AssignedTasksSection";
import { AssignedTasksSectionHeading } from "./AssignedTasksSectionHeading";

export function AssignedTasksSkeleton() {
  return (
    <AssignedTasksSection>
      <AssignedTasksSectionHeading />
      <List>
        <Repeat items={10} renderItem={() => <TaskListItemSkeleton />} />
      </List>
    </AssignedTasksSection>
  );
}
