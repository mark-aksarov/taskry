import "server-only";

import {
  AssignedTasksSection,
  AssignedTasksPresentation,
  AssignedTasksSectionHeading,
} from "../AssignedTasks";

import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TaskGridMobile } from "../TaskGrid";
import { TaskListSkeleton } from "../TaskList";
import { CreateTaskModal } from "../CreateTaskModal";
import { TaskGridItemMobile } from "../TaskGridItem";
import { AssignedTaskList } from "../AssignedTaskList";
import { CreateTaskProvider } from "../CreateTaskContext";
import { createTask } from "@/lib/actions/task/createTask";
import { updateTask } from "@/lib/actions/task/updateTask";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { deleteTask } from "@/lib/actions/task/deleteTask";
import { TaskDetailContainer } from "../TaskDetailContainer";
import { CreateTaskFormContainer } from "../CreateTaskFormContainer";
import { AssignedTaskListItem } from "../AssignedTaskListItem";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { UpdateTaskFormContainer } from "../UpdateTaskFormContainer";
import { TaskCommentsContainer } from "../TaskCommentsContainer";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { updateTaskStatus } from "@/lib/actions/task/updateTaskStatus";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
import { ProjectDetailContainer } from "@/components/projects/ProjectDetailContainer";
import { UserDetailHeaderContainer } from "@/components/users/UserDetailHeaderContainer";

interface AssignedTasksContainerProps {
  tasks: TaskListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export function AssignedTasksContainer(props: AssignedTasksContainerProps) {
  return (
    <Suspense
      fallback={
        <AssignedTasksSection>
          <AssignedTasksSectionHeading />
          <TaskListSkeleton items={10} showCheckbox={false} />
        </AssignedTasksSection>
      }
    >
      <AssignedTasksContainerInner {...props} />
    </Suspense>
  );
}

async function AssignedTasksContainerInner({
  tasks,
  totalCount,
  page,
  pageSize,
}: AssignedTasksContainerProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const getTaskCommonProps = (task: TaskListItemDTO) => ({
    id: task.id,
    title: task.title,
    deadline: task.deadline,
    assignee: task.assignee,
    status: task.status,
    commentsCount: task.commentsCount,
    sendComment,
    updateComment,
    updateTask,
    updateTaskStatus,
    deleteTask,
    taskDetailContainer: <TaskDetailContainer taskId={task.id} />,
    taskCommentsContainer: <TaskCommentsContainer taskId={task.id} />,
    userDetailContainer: task.assignee && (
      <UserDetailContainer userId={task.assignee.id} />
    ),
    userDetailHeaderContainer: task.assignee && (
      <UserDetailHeaderContainer userId={task.assignee.id} />
    ),
    updateTaskFormContainer: <UpdateTaskFormContainer taskId={task.id} />,
  });

  return (
    <CreateTaskProvider createTask={createTask}>
      <AssignedTasksPresentation
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
        totalPages={Math.ceil(totalCount / pageSize)}
        listLarge={
          <AssignedTaskList>
            {tasks.map((task) => (
              <AssignedTaskListItem
                key={task.id}
                {...getTaskCommonProps(task)}
                project={task.project}
                category={task.category}
                projectDetailContainer={
                  task.project && (
                    <ProjectDetailContainer projectId={task.project.id} />
                  )
                }
              />
            ))}
          </AssignedTaskList>
        }
        gridMobile={
          <TaskGridMobile>
            {tasks.map((task) => (
              <TaskGridItemMobile
                key={task.id}
                {...getTaskCommonProps(task)}
                subtasksTotal={task.subtasks.total}
                subtasksDone={task.subtasks.done}
              />
            ))}
          </TaskGridMobile>
        }
      />

      <CreateTaskModal
        createTaskFormContainer={
          <CreateTaskFormContainer forcedAssigneeId={session!.user.id} />
        }
      />
    </CreateTaskProvider>
  );
}
