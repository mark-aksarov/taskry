"use client";

import dynamic from "next/dynamic";
import { TaskGrid } from "./TaskGrid";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { UpdateTaskModal } from "./UpdateTaskModal";
import { TaskListItemSkeleton } from "./TaskListItem";
import { TaskCommentsModal } from "./TaskCommentsModal";
import { UpdateTaskProvider } from "./UpdateTaskProvider";
import { DeleteTaskProvider } from "./DeleteTaskProvider";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { GuestModeModal } from "../common/GuestModeModal";
import { TaskGridItemMobileSkeleton } from "./TaskGridItem";
import { TaskDetailSideSheet } from "./TaskDetailSideSheet";
import { TaskDetailContainer } from "./TaskDetailContainer";
import { TaskCommentsContainer } from "./TaskCommentsContainer";
import { ModalManagerProvider } from "@/common/ModalManagerContext";
import { UpdateTaskFormContainer } from "./UpdateTaskFormContainer";
import { UserDetailSideSheet } from "../users/UserDetailSideSheet";
import { UserDetailContainer } from "../users/UserDetailContainer";
import { CommentFormProvider } from "../comments/CommentFormContext";
import { UpdateTaskStatusProvider } from "./UpdateTaskStatusProvider";
import { SendCommentProvider } from "../comments/SendCommentProvider";
import { UpdateCommentProvider } from "../comments/UpdateCommentProvider";
import { ProjectDetailSideSheet } from "../projects/ProjectDetailSideSheet";
import { ProjectDetailContainer } from "../projects/ProjectDetailContainer";
import { UserDetailHeaderContainer } from "../users/UserDetailHeaderContainer";

const TaskListItem = dynamic(
  () => import("./TaskListItem").then((mod) => mod.TaskListItem),
  {
    ssr: false,
    loading: () => {
      return <TaskListItemSkeleton showCheckbox={true} />;
    },
  },
);

const TaskGridItemLarge = dynamic(
  () => import("./TaskGridItem").then((mod) => mod.TaskGridItemLarge),
  {
    ssr: false,
  },
);

const TaskGridItemMobile = dynamic(
  () => import("./TaskGridItem").then((mod) => mod.TaskGridItemMobile),
  {
    ssr: false,
    loading: () => <TaskGridItemMobileSkeleton />,
  },
);

export interface TaskGridContainerProps {
  tasks: TaskListItemDTO[];
  showCheckbox: boolean;
}

export function TaskGridContainer({
  tasks,
  showCheckbox,
}: TaskGridContainerProps) {
  return (
    <TaskGrid>
      {tasks.map((task) => {
        const subtaskStatProps = {
          subtasksTotal: task.subtasks.total,
          subtasksDone: task.subtasks.done,
        };

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
                        <TaskListItem {...task} showCheckbox={showCheckbox} />
                        <TaskGridItemLarge {...task} {...subtaskStatProps} />
                        <TaskGridItemMobile {...task} {...subtaskStatProps} />

                        {/* Modals and side sheets */}
                        <TaskDetailSideSheet
                          taskId={task.id}
                          taskDetailContainer={
                            <TaskDetailContainer taskId={task.id} />
                          }
                        />

                        {task.project && (
                          <ProjectDetailSideSheet
                            projectId={task.project.id}
                            projectDetailContainer={
                              <ProjectDetailContainer
                                projectId={task.project.id}
                              />
                            }
                          />
                        )}

                        {task.assignee && (
                          <UserDetailSideSheet
                            userId={task.assignee.id}
                            userDetailContainer={
                              <UserDetailContainer userId={task.assignee.id} />
                            }
                            userDetailHeaderContainer={
                              <UserDetailHeaderContainer
                                userId={task.assignee.id}
                              />
                            }
                          />
                        )}

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
    </TaskGrid>
  );
}
