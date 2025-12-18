import { TaskList } from "../TaskList";
import { TaskGrid } from "../TaskGrid";
import { TaskListItem } from "../TaskListItem";
import { TaskGridItem } from "../TaskGridItem";
import { TaskListItemDTO } from "@/lib/dto/task";
import { getTaskCount, getTaskList } from "@/lib/dal/task";
import { Pagination } from "@/components/common/Pagination";
import { ViewModeLayout } from "@/components/common/ViewMode";

interface TasksServerContainerProps {
  page: number;
  pageSize: number;
}

export async function TasksServerContainer({
  page,
  pageSize,
}: TasksServerContainerProps) {
  const tasks = await getTaskList({ page, pageSize });
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
