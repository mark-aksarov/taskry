import {
  canDeleteTask,
  canUpdateTask,
  canUpdateTaskStatus,
} from "@/lib/data/user/user.dal";

import { TaskList } from "../TaskList";
import { TaskGrid } from "../TaskGrid";
import { TaskFilters } from "@/lib/types";
import { TaskListItem } from "../TaskListItem";
import { TaskGridItem } from "../TaskGridItem";
import { getTaskCount } from "@/lib/data/task/task.dal";
import { getTaskList } from "@/lib/data/task/task.service";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { Pagination } from "@/components/common/Pagination";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";

interface TasksServerContainerProps {
  page: number;
  pageSize: number;
  sort: string;
  filters?: TaskFilters;
}

export async function TasksServerContainer({
  page,
  pageSize,
  sort,
  filters,
}: TasksServerContainerProps) {
  const tasks = await getTaskList({ page, pageSize, sort, filters });
  const count = await getTaskCount(filters);

  const getCommonProps = (task: TaskListItemDTO) => ({
    id: task.id,
    title: task.title,
    deadline: task.deadline,
    assignee: task.assignee,
    status: task.status,
    commentsCount: task.commentsCount,
    subtasksTotal: task.subtasks.total,
  });

  const totalPages = Math.ceil(count / pageSize);

  const paginationProps = {
    page,
    totalPages,
    pageSize,
    baseUrl: "/tasks",
  };

  const canDelete = await canDeleteTask();
  const canUpdate = await canUpdateTask();

  const tasksWithPermissions = await Promise.all(
    tasks.map(async (task) => {
      const canUpdateStatus = await canUpdateTaskStatus(task.assignee?.id);

      return {
        ...task,
        canDelete,
        canUpdate,
        canUpdateStatus,
      };
    }),
  );

  return (
    <>
      <ViewModeLayout
        list={
          <TaskList>
            {tasksWithPermissions.map((task) => {
              return (
                <TaskListItem
                  key={task.id}
                  category={task.category}
                  project={task.project}
                  canDelete={task.canDelete}
                  canUpdate={task.canUpdate}
                  canUpdateStatus={task.canUpdateStatus}
                  deleteAction={deleteTasks}
                  updateStatusAction={updateTaskStatuses}
                  showCheckbox
                  {...getCommonProps(task)}
                />
              );
            })}
          </TaskList>
        }
        grid={
          <TaskGrid>
            {tasksWithPermissions.map((task) => (
              <TaskGridItem
                key={task.id}
                subtasksDone={task.subtasks.done}
                projectStatus={task.project.status}
                canDelete={task.canDelete}
                canUpdate={task.canUpdate}
                canUpdateStatus={task.canUpdateStatus}
                updateStatusAction={updateTaskStatuses}
                deleteAction={deleteTasks}
                {...getCommonProps(task)}
              />
            ))}
          </TaskGrid>
        }
      />
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            {...paginationProps}
            size="large"
            className="max-md:hidden"
          />
          <Pagination {...paginationProps} className="md:hidden" />
        </div>
      )}
    </>
  );
}
