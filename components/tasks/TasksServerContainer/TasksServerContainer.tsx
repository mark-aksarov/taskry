import { TaskList } from "../TaskList";
import { TaskGrid } from "../TaskGrid";
import { TaskListItem } from "../TaskListItem";
import { TaskGridItem } from "../TaskGridItem";
import { TaskListItemDTO } from "@/lib/dto/task";
import { deleteTasks } from "@/lib/actions/deleteTasks";
import { getTaskCount, getTaskList } from "@/lib/dal/task";
import { Pagination } from "@/components/common/Pagination";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { updateTaskStatuses } from "@/lib/actions/updateTaskStatuses";

interface TasksServerContainerProps {
  page: number;
  pageSize: number;
  sort: string;
}

export async function TasksServerContainer({
  page,
  pageSize,
  sort,
}: TasksServerContainerProps) {
  const tasks = await getTaskList({ page, pageSize, sort });
  const count = await getTaskCount();

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
