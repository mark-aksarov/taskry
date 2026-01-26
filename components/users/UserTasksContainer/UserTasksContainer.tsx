import "server-only";

import {
  EntityPaginationProvider,
  EntityContainerPagination,
} from "@/components/common/EntityContainerPagination";

import { Suspense } from "react";
import { UserTaskList } from "../UserTaskList";
import { Repeat } from "@/components/common/Repeat";
import { UserTaskListItem } from "../UserTaskListItem";
import { getTaskList } from "@/lib/data/task/task.service";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { TaskDetailSkeleton } from "@/components/tasks/TaskDetail";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { TaskDetailModal } from "@/components/tasks/TaskDetailModal";
import { TaskFormBaseSkeleton } from "@/components/tasks/TaskFormBase";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { ProjectDetailSkeleton } from "@/components/projects/ProjectDetail";
import { TaskDetailContainer } from "@/components/tasks/TaskDetailContainer";
import { TaskCommentsContainer } from "@/components/tasks/TaskCommentsContainer";
import { TaskDetailBottomSheet } from "@/components/tasks/TaskDetailBottomSheet";
import { EditTaskFormContainer } from "@/components/tasks/EditTaskFormContainer";
import { TaskCommentsModalTrigger } from "@/components/tasks/TaskCommentsModalTrigger";
import { TaskItemActionMenuTrigger } from "@/components/tasks/TaskItemActionMenuTrigger";

interface UserTasksContainerProps {
  page: number;
  pageSize: number;
  sort: string;
  userId: string;
}

export async function UserTasksContainer({
  page,
  pageSize,
  sort,
  userId,
}: UserTasksContainerProps) {
  const filters = {
    status: [],
    category: [],
    project: [],
    assignee: [userId],
  };
  const { items: tasks, totalCount } = await getTaskList({
    page,
    pageSize,
    sort,
    filters,
  });

  return (
    <EntityPaginationProvider>
      <UserTaskList>
        {tasks.length &&
          tasks.map((task) => (
            <UserTaskListItem
              key={task.id}
              id={task.id}
              title={task.title}
              deadline={task.deadline}
              status={task.status}
              taskDetailModal={
                <TaskDetailModal
                  taskId={task.id}
                  taskDetailContainer={
                    <Suspense fallback={<TaskDetailSkeleton />}>
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
      </UserTaskList>

      <EntityContainerPagination
        page={page}
        totalPages={Math.ceil(totalCount / pageSize)}
        pageSize={pageSize}
        className="my-4"
      />
    </EntityPaginationProvider>
  );
}
