import { Suspense } from "react";
import { TaskList } from "../TaskList";
import { TaskGrid } from "../TaskGrid";
import { TaskFilters } from "@/lib/types";
import { TaskListItem } from "../TaskListItem";
import { TaskGridItem } from "../TaskGridItem";
import { TaskDetailSkeleton } from "../TaskDetail";
import { Repeat } from "@/components/common/Repeat";
import { TaskDetailModal } from "../TaskDetailModal";
import { TaskStatus } from "@/generated/prisma/enums";
import { TaskFormBaseSkeleton } from "../TaskFormBase";
import { getTaskList } from "@/lib/data/task/task.service";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { TaskDetailContainer } from "../TaskDetailContainer";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { EditTaskFormContainer } from "../EditTaskFormContainer";
import { TaskDetailBottomSheet } from "../TaskDetailBottomSheet";
import { TaskCommentsContainer } from "../TaskCommentsContainer";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { TaskCommentsModalTrigger } from "../TaskCommentsModalTrigger";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { CommentItemSkeleton } from "@/components/comments/CommentItem";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { ProjectDetailSkeleton } from "@/components/projects/ProjectDetail";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { UserDetailBottomSheet } from "@/components/users/UserDetailBottomSheet";
import { ProjectDetailContainer } from "@/components/projects/ProjectDetailContainer";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";

interface TaskItemActionMenuTriggerSlotProps {
  taskId: number;
  taskTitle: string;
  taskStatus: TaskStatus;
  className?: string;
}

function TaskItemActionMenuTriggerSlot({
  taskId,
  taskTitle,
  taskStatus,
  className,
}: TaskItemActionMenuTriggerSlotProps) {
  return (
    <TaskItemActionMenuTrigger
      taskId={taskId}
      taskTitle={taskTitle}
      taskStatus={taskStatus}
      deleteAction={deleteTasks}
      updateStatusAction={updateTaskStatuses}
      editTaskFormContainer={
        <Suspense fallback={<TaskFormBaseSkeleton />}>
          <EditTaskFormContainer taskId={taskId} />
        </Suspense>
      }
      className={className}
    />
  );
}

function TaskDetailModalSlot({ taskId }: { taskId: number }) {
  return (
    <TaskDetailModal
      taskId={taskId}
      taskDetailContainer={
        <Suspense fallback={<TaskDetailSkeleton />}>
          <TaskDetailContainer taskId={taskId} />
        </Suspense>
      }
    />
  );
}

function TaskDetailBottomSheetSlot({ taskId }: { taskId: number }) {
  return (
    <TaskDetailBottomSheet
      taskId={taskId}
      taskDetailContainer={
        <Suspense fallback={<TaskDetailSkeleton />}>
          <TaskDetailContainer taskId={taskId} />
        </Suspense>
      }
    />
  );
}

interface TaskCommentsModalTriggerSlotProps {
  taskId: number;
  commentsCount: number;
}

function TaskCommentsModalTriggerSlot({
  taskId,
  commentsCount,
}: TaskCommentsModalTriggerSlotProps) {
  return (
    <TaskCommentsModalTrigger
      taskId={taskId}
      commentsCount={commentsCount}
      taskCommentsContainer={
        <Suspense
          fallback={
            <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />
          }
        >
          <TaskCommentsContainer taskId={taskId} />
        </Suspense>
      }
      sendCommentAction={sendComment}
      updateCommentAction={updateComment}
    />
  );
}

function ProjectDetailModalSlot({ projectId }: { projectId: number }) {
  return (
    <ProjectDetailModal
      projectId={projectId}
      projectDetailContainer={
        <Suspense fallback={<ProjectDetailSkeleton />}>
          <ProjectDetailContainer projectId={projectId} />
        </Suspense>
      }
    />
  );
}

function UserDetailSlotContent({ userId }: { userId: string }) {
  return (
    <Suspense
      fallback={
        <PersonDetailPresentation
          personHeader={<PersonHeaderSkeleton />}
          userDetail={<UserDetailSkeleton />}
        />
      }
    >
      <UserDetailContainer userId={userId} />
    </Suspense>
  );
}

function UserDetailModalSlot({ userId }: { userId: string }) {
  return (
    <UserDetailModal
      userId={userId}
      userDetailContainer={
        <Suspense fallback={<UserDetailSkeleton />}>
          <UserDetailSlotContent userId={userId} />
        </Suspense>
      }
    />
  );
}

function UserDetailBottomSheetSlot({ userId }: { userId: string }) {
  return (
    <UserDetailBottomSheet
      userId={userId}
      userDetailContainer={
        <Suspense fallback={<UserDetailSkeleton />}>
          <UserDetailSlotContent userId={userId} />
        </Suspense>
      }
    />
  );
}

interface TasksContainerProps {
  page: number;
  pageSize: number;
  sort: string;
  filters?: TaskFilters;
}

export async function TasksContainer({
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

  const getCommonProps = (task: TaskListItemDTO) => ({
    id: task.id,
    title: task.title,
    deadline: task.deadline,
    assignee: task.assignee,
    status: task.status,
    commentsCount: task.commentsCount,
    subtasksTotal: task.subtasks.total,
  });

  return (
    <EntityContainerPresentation
      list={
        <TaskList showCheckbox>
          {tasks.map((task) => {
            return (
              <TaskListItem
                key={task.id}
                category={task.category}
                project={task.project}
                taskDetailModal={<TaskDetailModalSlot taskId={task.id} />}
                taskDetailBottomSheet={
                  <TaskDetailBottomSheetSlot taskId={task.id} />
                }
                commentModalTrigger={
                  <TaskCommentsModalTriggerSlot
                    taskId={task.id}
                    commentsCount={task.commentsCount}
                  />
                }
                projectDetailModal={
                  <ProjectDetailModalSlot projectId={task.project.id} />
                }
                userDetailModal={
                  task.assignee && (
                    <UserDetailModalSlot userId={task.assignee.id} />
                  )
                }
                menuTrigger={
                  <TaskItemActionMenuTriggerSlot
                    taskId={task.id}
                    taskTitle={task.title}
                    taskStatus={task.status}
                  />
                }
                showCheckbox
                {...getCommonProps(task)}
              />
            );
          })}
        </TaskList>
      }
      grid={
        <TaskGrid>
          {tasks.map((task) => (
            <TaskGridItem
              key={task.id}
              subtasksDone={task.subtasks.done}
              taskDetailModal={<TaskDetailModalSlot taskId={task.id} />}
              taskDetailBottomSheet={
                <TaskDetailBottomSheetSlot taskId={task.id} />
              }
              commentModalTrigger={
                <TaskCommentsModalTriggerSlot
                  taskId={task.id}
                  commentsCount={task.commentsCount}
                />
              }
              menuTrigger={
                <TaskItemActionMenuTriggerSlot
                  taskId={task.id}
                  taskTitle={task.title}
                  taskStatus={task.status}
                  className="-mr-2"
                />
              }
              userDetailModal={
                task.assignee && (
                  <UserDetailModalSlot userId={task.assignee.id} />
                )
              }
              userDetailBottomSheet={
                task.assignee && (
                  <UserDetailBottomSheetSlot userId={task.assignee.id} />
                )
              }
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
