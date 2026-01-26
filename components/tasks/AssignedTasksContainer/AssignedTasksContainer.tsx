import "server-only";

import {
  AssignedTasksPresentation,
  AssignedTasksEmptySection,
  AssignedTasksSkeleton,
} from "../AssignedTasks";

import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TaskList } from "../TaskList";
import { TaskListItem } from "../TaskListItem";
import { TaskDetailModal } from "../TaskDetailModal";
import { getTaskList } from "@/lib/data/task/task.service";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { TaskDetailContainer } from "../TaskDetailContainer";
import { NewTaskFormContainer } from "../NewTaskFormContainer";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { TaskDetailBottomSheet } from "../TaskDetailBottomSheet";
import { EditTaskFormContainer } from "../EditTaskFormContainer";
import { TaskCommentsContainer } from "../TaskCommentsContainer";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { TaskCommentsModalTrigger } from "../TaskCommentsModalTrigger";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { ProjectDetailContainer } from "@/components/projects/ProjectDetailContainer";

interface AssignedTasksContainerProps {
  page: number;
  pageSize: number;
}

export function AssignedTasksContainer(props: AssignedTasksContainerProps) {
  return (
    <Suspense fallback={<AssignedTasksSkeleton />}>
      <AssignedTasksContainerInner {...props} />
    </Suspense>
  );
}

async function AssignedTasksContainerInner({
  page,
  pageSize,
}: AssignedTasksContainerProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const assigneeId = session!.user.id;

  const filters = {
    assignee: [assigneeId],
  };

  const { items: tasks, totalCount } = await getTaskList({
    page,
    pageSize,
    sort: "deadline",
    filters,
  });

  if (!totalCount) {
    return (
      <AssignedTasksEmptySection
        newTaskFormContainer={<NewTaskFormContainer />}
      />
    );
  }

  return (
    <AssignedTasksPresentation
      page={page}
      pageSize={pageSize}
      totalPages={Math.ceil(totalCount / pageSize)}
      list={
        <TaskList>
          {tasks.map((task) => (
            <TaskListItem
              key={task.id}
              id={task.id}
              title={task.title}
              deadline={task.deadline}
              category={task.category}
              project={task.project}
              status={task.status}
              assignee={task.assignee}
              taskDetailModal={
                <TaskDetailModal
                  taskId={task.id}
                  taskDetailContainer={<TaskDetailContainer taskId={task.id} />}
                />
              }
              taskDetailBottomSheet={
                <TaskDetailBottomSheet
                  taskId={task.id}
                  taskDetailContainer={<TaskDetailContainer taskId={task.id} />}
                />
              }
              commentModalTrigger={
                <TaskCommentsModalTrigger
                  taskId={task.id}
                  commentsCount={task.commentsCount}
                  taskCommentsContainer={
                    <TaskCommentsContainer taskId={task.id} />
                  }
                  sendCommentAction={sendComment}
                  updateCommentAction={updateComment}
                />
              }
              userDetailModal={
                task.assignee && (
                  <UserDetailModal
                    userId={task.assignee.id}
                    userDetailContainer={
                      <UserDetailContainer userId={task.assignee.id} />
                    }
                  />
                )
              }
              projectDetailModal={
                <ProjectDetailModal
                  projectId={task.project.id}
                  projectDetailContainer={
                    <ProjectDetailContainer projectId={task.project.id} />
                  }
                />
              }
              menuTrigger={
                <TaskItemActionMenuTrigger
                  taskId={task.id}
                  taskTitle={task.title}
                  taskStatus={task.status}
                  deleteAction={deleteTasks}
                  updateStatusAction={updateTaskStatuses}
                  editTaskFormContainer={
                    <EditTaskFormContainer taskId={task.id} />
                  }
                />
              }
            />
          ))}
        </TaskList>
      }
    />
  );
}
