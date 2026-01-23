import {
  AssignedTasksPresentation,
  AssignedTasksEmptySection,
} from "../AssignedTasks";

import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TaskList } from "../TaskList";
import { TaskListItem } from "../TaskListItem";
import { Repeat } from "@/components/common/Repeat";
import { TaskDetailModal } from "../TaskDetailModal";
import { TaskFormBaseSkeleton } from "../TaskFormBase";
import { getTaskList } from "@/lib/data/task/task.service";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { TaskDetailContainer } from "../TaskDetailContainer";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { TaskDetailBottomSheet } from "../TaskDetailBottomSheet";
import { EditTaskFormContainer } from "../EditTaskFormContainer";
import { TaskCommentsContainer } from "../TaskCommentsContainer";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { TaskCommentsModalTrigger } from "../TaskCommentsModalTrigger";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { ProjectDetailSkeleton } from "@/components/projects/ProjectDetail";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { ProjectDetailContainer } from "@/components/projects/ProjectDetailContainer";

interface AssignedTasksContainerProps {
  page: number;
  pageSize: number;
  newTaskFormContainer: React.ReactNode;
}

export async function AssignedTasksContainer({
  page,
  pageSize,
  newTaskFormContainer,
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
      <AssignedTasksEmptySection newTaskFormContainer={newTaskFormContainer} />
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
                  taskDetailContainer={
                    <Suspense fallback={<ProjectDetailSkeleton />}>
                      <TaskDetailContainer taskId={task.id} />
                    </Suspense>
                  }
                />
              }
              taskDetailBottomSheet={
                <TaskDetailBottomSheet
                  taskId={task.id}
                  taskDetailContainer={
                    <Suspense fallback={<ProjectDetailSkeleton />}>
                      <TaskDetailContainer taskId={task.id} />
                    </Suspense>
                  }
                />
              }
              commentModalTrigger={
                <TaskCommentsModalTrigger
                  taskId={task.id}
                  commentsCount={task.commentsCount}
                  taskCommentsContainer={
                    <Suspense
                      fallback={
                        <Repeat
                          items={10}
                          renderItem={() => <CommentItemSkeleton />}
                        />
                      }
                    >
                      <TaskCommentsContainer taskId={task.id} />
                    </Suspense>
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
                      <Suspense fallback={<UserDetailSkeleton />}>
                        <UserDetailContainer userId={task.assignee.id} />
                      </Suspense>
                    }
                  />
                )
              }
              projectDetailModal={
                <ProjectDetailModal
                  projectId={task.project.id}
                  projectDetailContainer={
                    <Suspense fallback={<ProjectDetailSkeleton />}>
                      <ProjectDetailContainer projectId={task.project.id} />
                    </Suspense>
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
                    <Suspense fallback={<TaskFormBaseSkeleton />}>
                      <EditTaskFormContainer taskId={task.id} />
                    </Suspense>
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
