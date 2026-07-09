import { mockedTaskList } from "@/mocks/tasks";
import { UserTaskList } from "../UserTaskList";
import { UserTaskListItem } from "../../UserTaskListItem";
import { TaskGridItemMobile } from "@/dashboard/tasks/TaskGridItem";
import { MockedDeleteTaskProvider } from "@/dashboard/tasks/DeleteTaskProvider/__stories__";
import { MockedUpdateTaskProvider } from "@/dashboard/tasks/UpdateTaskProvider/__stories__";
import { MockedUpdateTaskStatusProvider } from "@/dashboard/tasks/UpdateTaskStatusProvider/__stories__";

export function UserTaskListExample() {
  return (
    <UserTaskList>
      {mockedTaskList.map((task) => (
        <MockedDeleteTaskProvider key={task.id}>
          <MockedUpdateTaskProvider>
            <MockedUpdateTaskStatusProvider>
              <UserTaskListItem {...task} />
              <TaskGridItemMobile
                {...task}
                subtasksTotal={task.subtasks.total}
                subtasksDone={task.subtasks.done}
              />
            </MockedUpdateTaskStatusProvider>
          </MockedUpdateTaskProvider>
        </MockedDeleteTaskProvider>
      ))}
    </UserTaskList>
  );
}
