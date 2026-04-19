"use client";

import dynamic from "next/dynamic";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { UpdateTaskModal } from "./UpdateTaskModal";
import { TaskListItemSkeleton } from "./TaskListItem";
import { TaskCommentsModal } from "./TaskCommentsModal";
import { GuestModeModal } from "../common/GuestModeModal";
import { UpdateTaskProvider } from "./UpdateTaskProvider";
import { DeleteTaskProvider } from "./DeleteTaskProvider";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { TaskGridItemMobileSkeleton } from "./TaskGridItem";
import { TaskDetailSideSheet } from "./TaskDetailSideSheet";
import { TaskDetailContainer } from "./TaskDetailContainer";
import { TaskCommentsContainer } from "./TaskCommentsContainer";
import { UserDetailSideSheet } from "../users/UserDetailSideSheet";
import { UserDetailContainer } from "../users/UserDetailContainer";
import { UpdateTaskFormContainer } from "./UpdateTaskFormContainer";
import { ModalManagerProvider } from "../common/ModalManagerContext";
import { CommentFormProvider } from "../comments/CommentFormContext";
import { UpdateTaskStatusProvider } from "./UpdateTaskStatusProvider";
import { SendCommentProvider } from "../comments/SendCommentProvider";
import { UpdateCommentProvider } from "../comments/UpdateCommentProvider";
import { ProjectDetailSideSheet } from "../projects/ProjectDetailSideSheet";
import { ProjectDetailContainer } from "../projects/ProjectDetailContainer";
import { UserDetailHeaderContainer } from "../users/UserDetailHeaderContainer";
import { EntityContainerPresentation } from "../common/EntityContainerPresentation";

const TaskListItem = dynamic(
  () => import("./TaskListItem").then((mod) => mod.TaskListItem),
  {
    ssr: false,
    loading: () => <TaskListItemSkeleton showCheckbox={true} />,
  },
);

const TaskListItemAlt = dynamic(
  () => import("./TaskListItem").then((mod) => mod.TaskListItem),
  {
    ssr: false,
    loading: () => <TaskListItemSkeleton showCheckbox={false} />,
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

export interface TasksContainerProps {
  tasks: TaskListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
  showCheckbox: boolean;
}

export function TasksContainer({
  tasks,
  totalCount,
  page,
  pageSize,
  showCheckbox,
}: TasksContainerProps) {
  return (
    <EntityContainerPresentation
      page={page}
      pageSize={pageSize}
      totalPages={Math.ceil(totalCount / pageSize)}
    >
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
                        {showCheckbox ? (
                          <TaskListItem {...task} showCheckbox={true} />
                        ) : (
                          <TaskListItemAlt {...task} showCheckbox={false} />
                        )}
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
    </EntityContainerPresentation>
  );
}
