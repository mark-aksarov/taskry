"use client";

import dynamic from "next/dynamic";
import { GuestModeModal } from "../common/GuestModeModal";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { UpdateTaskModal } from "../tasks/UpdateTaskModal";
import { DeleteTaskModal } from "../tasks/DeleteTaskModal";
import { UserTaskListItemSkeleton } from "./UserTaskListItem";
import { TaskCommentsModal } from "../tasks/TaskCommentsModal";
import { UserTasksPresentation } from "./UserTasksPresentation";
import { UpdateTaskProvider } from "../tasks/UpdateTaskProvider";
import { DeleteTaskProvider } from "../tasks/DeleteTaskProvider";
import { TaskGridItemMobileSkeleton } from "../tasks/TaskGridItem";
import { TaskDetailSideSheet } from "../tasks/TaskDetailSideSheet";
import { TaskDetailContainer } from "../tasks/TaskDetailContainer";
import { ModalManagerProvider } from "../../common/ModalManagerContext";
import { CommentFormProvider } from "../comments/CommentFormContext";
import { SendCommentProvider } from "../comments/SendCommentProvider";
import { TaskCommentsContainer } from "../tasks/TaskCommentsContainer";
import { UpdateCommentProvider } from "../comments/UpdateCommentProvider";
import { UpdateTaskFormContainer } from "../tasks/UpdateTaskFormContainer";
import { UpdateTaskStatusProvider } from "../tasks/UpdateTaskStatusProvider";

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

interface UserTasksContainerProps {
  tasks: TaskListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export function UserTasksContainer({
  tasks,
  totalCount,
  page,
  pageSize,
}: UserTasksContainerProps) {
  return (
    <UserTasksPresentation
      page={page}
      pageSize={pageSize}
      totalPages={Math.ceil(totalCount / pageSize)}
    >
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
    </UserTasksPresentation>
  );
}
