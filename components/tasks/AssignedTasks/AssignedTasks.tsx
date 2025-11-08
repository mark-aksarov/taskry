import { TaskList } from "../TaskList";
import { AssignedTasksSection } from "./AssignedTasksSection";
import { AssignedTasksSectionHeading } from "./AssignedTasksSectionHeading";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { TaskListItem, TaskListItemType } from "../TaskListItem";

export async function AssignedTasks({ tasks }: { tasks?: TaskListItemType[] }) {
  return (
    <AssignedTasksSection>
      <AssignedTasksSectionHeading />
      {!tasks ? (
        <List>
          <Repeat items={10} renderItem={() => <TaskListItem />} />
        </List>
      ) : (
        <TaskList tasks={tasks} showCheckbox={false} />
      )}
    </AssignedTasksSection>
  );
}
