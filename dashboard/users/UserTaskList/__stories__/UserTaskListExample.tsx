import { mockedTaskList } from "@/mocks/tasks";
import { UserTaskList } from "../UserTaskList";
import { UserTaskListItem } from "../../UserTaskListItem";
import { TaskGridItemMobile } from "@/dashboard/tasks/TaskGridItem";
import { DeleteTaskProvider } from "@/dashboard/tasks/DeleteTaskContext";
import { UpdateTaskProvider } from "@/dashboard/tasks/UpdateTaskContext";
import { UpdateTaskStatusProvider } from "@/dashboard/tasks/UpdateTaskStatusContext";

export function UserTaskListExample() {
  return (
    <UserTaskList>
      {mockedTaskList.map((task) => (
        <DeleteTaskProvider key={task.id}>
          <UpdateTaskProvider>
            <UpdateTaskStatusProvider>
              <UserTaskListItem {...task} />
              <TaskGridItemMobile
                {...task}
                subtasksTotal={task.subtasks.total}
                subtasksDone={task.subtasks.done}
              />
            </UpdateTaskStatusProvider>
          </UpdateTaskProvider>
        </DeleteTaskProvider>
      ))}
    </UserTaskList>
  );
}
