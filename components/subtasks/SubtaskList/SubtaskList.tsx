import { SubtaskListItem } from "../SubtaskListItem";
import { List } from "@/components/common/List";
import { Subtask } from "@/generated/prisma";

interface TaskListProps {
  subtasks: Subtask[];
}

export function SubtaskList({ subtasks }: TaskListProps) {
  return (
    <List className="md:gap-0">
      {subtasks.map((subtask) => (
        <SubtaskListItem key={subtask.id} subtask={subtask} />
      ))}
    </List>
  );
}
