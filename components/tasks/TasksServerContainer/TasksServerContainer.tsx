import { TaskList } from "../TaskList";
import { TaskGrid } from "../TaskGrid";
import { TaskListItem } from "../TaskListItem";
import { TaskGridItem } from "../TaskGridItem";
import { deleteTasks } from "@/lib/actions/deleteTasks";
import { Pagination } from "@/components/common/Pagination";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { getTaskCount, getTaskList } from "@/lib/data/task/task.dal";
import { updateTaskStatuses } from "@/lib/actions/updateTaskStatuses";
import { TaskFilters, TaskListItemDTO } from "@/lib/data/task/task.dto";

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

  return (
    <>
      <ViewModeLayout
        list={
          <TaskList>
            {tasks.map((task) => (
              <TaskListItem
                key={task.id}
                category={task.category}
                project={task.project}
                deleteAction={deleteTasks}
                updateStatusAction={updateTaskStatuses}
                showCheckbox
                {...getCommonProps(task)}
              />
            ))}
          </TaskList>
        }
        grid={
          <TaskGrid>
            {tasks.map((task) => (
              <TaskGridItem
                key={task.id}
                subtasksDone={task.subtasks.done}
                projectStatus={task.project.status}
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
