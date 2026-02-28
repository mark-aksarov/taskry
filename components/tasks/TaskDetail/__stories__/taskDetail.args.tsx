import { mockedTaskDetail } from "@/mocks/tasks";
import { mockedSubtaskList } from "@/mocks/subtasks";
import { SubtaskList } from "@/components/subtasks/SubtaskList";
import { SubtaskListItem } from "@/components/subtasks/SubtaskListItem";

const task = mockedTaskDetail;

export const getSubtasksList = () => (
  <SubtaskList>
    {mockedSubtaskList.map((subtask) => (
      <SubtaskListItem
        key={subtask.id}
        id={subtask.id}
        text={subtask.subtaskText}
        isDone={subtask.isDone}
        taskId={1}
        toggleSubtask={() => ({ status: "success" as const })}
        updateSubtask={() => ({ status: "success" as const })}
        deleteSubtask={() => ({ status: "success" as const })}
      />
    ))}
  </SubtaskList>
);

export const taskDetailArgs = {
  ...task,
  subtasksList: getSubtasksList(),
  mutate: () => {},
  createSubtask: () => ({ status: "success" as const }),
};
