import { mockedTaskList } from "@/mocks/tasks";
import { TaskListItem } from "../../TaskListItem";
import { useViewMode } from "@/dashboard/common/ViewMode";
import { EntityGrid } from "@/dashboard/common/EntityGrid";
import { DeleteTaskProvider } from "../../DeleteTaskContext";
import { UpdateTaskProvider } from "../../UpdateTaskContext";
import { UpdateTaskStatusProvider } from "../../UpdateTaskStatusContext";
import { TaskGridItemMobile, TaskGridItemLarge } from "../../TaskGridItem";
import { DeadlineProvider } from "@/dashboard/common/DeadlineContext";

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
          <DeleteTaskProvider key={task.id}>
            <UpdateTaskProvider>
              <UpdateTaskStatusProvider>
                <DeadlineProvider deadline={task.deadline} status={task.status}>
                  <TaskListItem {...task} showCheckbox={showCheckbox} />
                  <TaskGridItemMobile {...task} {...taskStat} />
                  <TaskGridItemLarge {...task} {...taskStat} />
                </DeadlineProvider>
              </UpdateTaskStatusProvider>
            </UpdateTaskProvider>
          </DeleteTaskProvider>
        );
      })}
    </EntityGrid>
  );
}
