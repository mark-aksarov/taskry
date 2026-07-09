"use client";

import dynamic from "next/dynamic";
import { UserTaskList } from "./UserTaskList";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { UserTaskListItemSkeleton } from "./UserTaskListItem";
import { GuestModeModal } from "@/dashboard/common/GuestModeModal";
import { UpdateTaskModal } from "@/dashboard/tasks/UpdateTaskModal";
import { DeleteTaskModal } from "@/dashboard/tasks/DeleteTaskModal";
import { TaskCommentsModal } from "@/dashboard/tasks/TaskCommentsModal";
import { UpdateTaskProvider } from "@/dashboard/tasks/UpdateTaskProvider";
import { DeleteTaskProvider } from "@/dashboard/tasks/DeleteTaskProvider";
import { TaskGridItemMobileSkeleton } from "@/dashboard/tasks/TaskGridItem";
import { TaskDetailSideSheet } from "@/dashboard/tasks/TaskDetailSideSheet";
import { TaskDetailContainer } from "@/dashboard/tasks/TaskDetailContainer";
import { CommentFormProvider } from "@/dashboard/comments/CommentFormContext";
import { SendCommentProvider } from "@/dashboard/comments/SendCommentProvider";
import { TaskCommentsContainer } from "@/dashboard/tasks/TaskCommentsContainer";
import { ModalManagerProvider } from "@/dashboard/../common/ModalManagerContext";
import { UpdateCommentProvider } from "@/dashboard/comments/UpdateCommentProvider";
import { UpdateTaskFormContainer } from "@/dashboard/tasks/UpdateTaskFormContainer";
import { UpdateTaskStatusProvider } from "@/dashboard/tasks/UpdateTaskStatusProvider";

const UserTaskListItem = dynamic(
  () => import("./UserTaskListItem").then((mod) => mod.UserTaskListItem),
  {
    ssr: false,
    loading: () => <UserTaskListItemSkeleton />,
  },
);

const TaskGridItemMobile = dynamic(
  () =>
    import("@/dashboard/tasks/TaskGridItem").then(
      (mod) => mod.TaskGridItemMobile,
    ),
  {
    ssr: false,
    loading: () => <TaskGridItemMobileSkeleton />,
  },
);

interface UserTaskListContainerProps {
  tasks: TaskListItemDTO[];
}

export function UserTaskListContainer({ tasks }: UserTaskListContainerProps) {
  return (
    <UserTaskList>
      {tasks.map((task) => {
        return (
          <ModalManagerProvider key={task.id}>
            <UpdateTaskProvider>
              <DeleteTaskProvider>
                <UpdateTaskStatusProvider>
                  <CommentFormProvider
                    entityId={task.id}
                    entityKey="taskId"
                    mutateUrl={`/api/tasks/${task.id}/comments`}
                  >
                    <SendCommentProvider>
                      <UpdateCommentProvider>
                        {/* Dynamic */}
                        <UserTaskListItem {...task} />
                        <TaskGridItemMobile
                          {...task}
                          subtasksTotal={task.subtasks.total}
                          subtasksDone={task.subtasks.done}
                        />

                        {/* Modals and side sheets */}
                        <TaskDetailSideSheet
                          taskId={task.id}
                          taskDetailContainer={
                            <TaskDetailContainer taskId={task.id} />
                          }
                        />

                        <TaskCommentsModal
                          taskCommentsContainer={
                            <TaskCommentsContainer taskId={task.id} />
                          }
                        />

                        <UpdateTaskModal
                          updateTaskFormContainer={
                            <UpdateTaskFormContainer taskId={task.id} />
                          }
                        />

                        <DeleteTaskModal
                          taskId={task.id}
                          taskTitle={task.title}
                        />
                      </UpdateCommentProvider>
                    </SendCommentProvider>
                  </CommentFormProvider>
                </UpdateTaskStatusProvider>
              </DeleteTaskProvider>
            </UpdateTaskProvider>

            <GuestModeModal />
          </ModalManagerProvider>
        );
      })}
    </UserTaskList>
  );
}
