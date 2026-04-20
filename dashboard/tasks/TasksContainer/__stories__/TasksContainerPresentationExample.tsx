import { TaskGridItemMobile, TaskGridItemLarge } from "../../TaskGridItem";

import { mockedTaskList } from "@/mocks/tasks";
import { TaskListItem } from "../../TaskListItem";
import { MockedDeleteTaskProvider } from "../../DeleteTaskProvider/__stories__";
import { MockedUpdateTaskProvider } from "../../UpdateTaskProvider/__stories__";
import { MockedUpdateTaskStatusProvider } from "../../UpdateTaskStatusProvider/__stories__";
import { EntityContainerPresentation } from "@/dashboard/common/EntityContainerPresentation";

export function TasksContainerPresentationExample() {
  return (
    <EntityContainerPresentation page={1} pageSize={10} totalPages={3}>
      {mockedTaskList.map((task) => {
        const taskStat = {
          subtasksTotal: task.subtasks.total,
          subtasksDone: task.subtasks.done,
        };

        return (
          <MockedDeleteTaskProvider key={task.id}>
            <MockedUpdateTaskProvider>
              <MockedUpdateTaskStatusProvider>
                <TaskListItem {...task} showCheckbox={true} />
                <TaskGridItemMobile {...task} {...taskStat} />
                <TaskGridItemLarge {...task} {...taskStat} />
              </MockedUpdateTaskStatusProvider>
            </MockedUpdateTaskProvider>
          </MockedDeleteTaskProvider>
        );
      })}
    </EntityContainerPresentation>
  );
}
