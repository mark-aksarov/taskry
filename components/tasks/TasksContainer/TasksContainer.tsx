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
import { getTaskList } from "@/lib/data/task/task.service";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { TaskCommentsModalTrigger } from "../TaskCommentsModalTrigger";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";

interface TasksContainerProps {
  guestMode?: boolean;
  page: number;
  pageSize: number;
  sort: string;
  filters?: TaskFilters;
}

export async function TasksContainer({
  guestMode,
  page,
  pageSize,
  sort,
  filters,
}: TasksContainerProps) {
  const { items: tasks, totalCount } = await getTaskList({
    page,
    pageSize,
    sort,
    filters,
  });

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

  const getCommonProps = (task: TaskListItemDTO) => ({
    id: task.id,
    title: task.title,
    deadline: task.deadline,
    assignee: task.assignee,
    status: task.status,
    commentsCount: task.commentsCount,
    subtasksTotal: task.subtasks.total,
  });

  const renderMenuTrigger = (
    task: (typeof tasksWithPermissions)[number],
    className?: string,
  ) => {
    return (
      <TaskItemActionMenuTrigger
        guestMode={guestMode}
        taskId={task.id}
        taskTitle={task.title}
        taskStatus={task.status}
        projectStatus={task.project.status}
        canDelete={canDelete}
        canUpdate={canUpdate}
        canUpdateStatus={task.canUpdateStatus}
        deleteAction={deleteTasks}
        updateStatusAction={updateTaskStatuses}
        className={className}
      />
    );
  };

  return (
    <EntityContainerPresentation
      list={
        <TaskList showCheckbox>
          {tasksWithPermissions.map((task) => {
            return (
              <TaskListItem
                key={task.id}
                category={task.category}
                project={task.project}
                commentModalTrigger={
                  <TaskCommentsModalTrigger
                    taskId={task.id}
                    commentsCount={task.commentsCount}
                    sendCommentAction={sendComment}
                  />
                }
                menuTrigger={renderMenuTrigger(task)}
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
              commentModalTrigger={
                <TaskCommentsModalTrigger
                  taskId={task.id}
                  commentsCount={task.commentsCount}
                  sendCommentAction={sendComment}
                />
              }
              menuTrigger={renderMenuTrigger(task, "-mr-2")}
              {...getCommonProps(task)}
            />
          ))}
        </TaskGrid>
      }
      page={page}
      pageSize={pageSize}
      totalPages={Math.ceil(totalCount / pageSize)}
    />
  );
}
