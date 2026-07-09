import { TaskGridItemMobile, TaskGridItemLarge } from "../../TaskGridItem";

import { mockedTaskList } from "@/mocks/tasks";
import { TaskListItem } from "../../TaskListItem";
import { useViewMode } from "@/dashboard/common/ViewMode";
import { EntityGrid } from "@/dashboard/common/EntityGrid";
import { MockedDeleteTaskProvider } from "../../DeleteTaskProvider/__stories__";
import { MockedUpdateTaskProvider } from "../../UpdateTaskProvider/__stories__";
import { MockedUpdateTaskStatusProvider } from "../../UpdateTaskStatusProvider/__stories__";

export function TaskGridExample({ showCheckbox }: { showCheckbox: boolean }) {
  const { viewMode } = useViewMode();

  return (
    <EntityGrid viewMode={viewMode}>
      {mockedTaskList.map((task) => {
        const taskStat = {
          subtasksTotal: task.subtasks.total,
          subtasksDone: task.subtasks.done,
        };

        return (
          <MockedDeleteTaskProvider key={task.id}>
            <MockedUpdateTaskProvider>
              <MockedUpdateTaskStatusProvider>
                <TaskListItem {...task} showCheckbox={showCheckbox} />
                <TaskGridItemMobile {...task} {...taskStat} />
                <TaskGridItemLarge {...task} {...taskStat} />
              </MockedUpdateTaskStatusProvider>
            </MockedUpdateTaskProvider>
          </MockedDeleteTaskProvider>
        );
      })}
    </EntityGrid>
  );
}
