import "server-only";

import { TaskList } from "./TaskList";
import { TaskGrid } from "./TaskGrid";
import { TaskItem } from "./TaskItem";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { TaskDetailContainer } from "./TaskDetailContainer";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { EditTaskFormContainer } from "./EditTaskFormContainer";
import { TaskCommentsContainer } from "./TaskCommentsContainer";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
import { ProjectDetailContainer } from "@/components/projects/ProjectDetailContainer";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";

interface TasksContainerProps {
  tasks: TaskListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export async function TasksContainer({
  tasks,
  totalCount,
  page,
  pageSize,
}: TasksContainerProps) {
  const getCommonProps = (task: TaskListItemDTO) => ({});

  const items = (
    <>
      {tasks.map((task) => {
        return (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            deadline={task.deadline}
            assignee={task.assignee}
            status={task.status}
            commentsCount={task.commentsCount}
            subtasksTotal={task.subtasks.total}
            subtasksDone={task.subtasks.done}
            sendComment={sendComment}
            updateComment={updateComment}
            deleteTask={deleteTasks}
            category={task.category}
            project={task.project}
            updateTaskStatus={updateTaskStatuses}
            taskDetailContainer={<TaskDetailContainer taskId={task.id} />}
            taskCommentsContainer={<TaskCommentsContainer taskId={task.id} />}
            projectDetailContainer={
              <ProjectDetailContainer projectId={task.project.id} />
            }
            userDetailContainer={
              task.assignee && <UserDetailContainer userId={task.assignee.id} />
            }
            editTaskFormContainer={<EditTaskFormContainer taskId={task.id} />}
            showCheckbox
            {...getCommonProps(task)}
          />
        );
      })}
    </>
  );

  return (
    <EntityContainerPresentation
      list={<TaskList>{items}</TaskList>}
      grid={<TaskGrid>{items}</TaskGrid>}
      page={page}
      pageSize={pageSize}
      totalPages={Math.ceil(totalCount / pageSize)}
    />
  );
}
