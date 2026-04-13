import { DeleteTaskModal } from "../DeleteTaskModal";
import { UpdateTaskModal } from "../UpdateTaskModal";
import { TaskDetailModal } from "../TaskDetailModal";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { UpdateTaskProvider } from "../UpdateTaskProvider";
import { DeleteTaskProvider } from "../DeleteTaskProvider";
import { TaskDetailContainer } from "../TaskDetailContainer";
import { TaskCommentsContainer } from "../TaskCommentsContainer";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { UpdateTaskFormContainer } from "../UpdateTaskFormContainer";
import { UpdateTaskStatusProvider } from "../UpdateTaskStatusProvider";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { UpdateUserImageModal } from "@/components/users/UpdateUserImageModal";
import { DeleteUserImageModal } from "@/components/users/DeleteUserImageModal";
import { CommentFormProvider } from "@/components/comments/CommentFormContext";
import { ModalManagerProvider } from "@/components/common/ModalManagerContext";
import { SendCommentProvider } from "@/components/comments/SendCommentProvider";
import { UpdateCommentProvider } from "@/components/comments/UpdateCommentProvider";
import { UpdateUserImageProvider } from "@/components/users/UpdateUserImageProvider";
import { ProjectDetailContainer } from "@/components/projects/ProjectDetailContainer";
import { UserDetailHeaderContainer } from "@/components/users/UserDetailHeaderContainer";
import { ClearUserImageUrlProvider } from "@/components/users/ClearUserImageUrlProvider";
import { UpdateUserImageFileProvider } from "@/components/users/UpdateUserImageFileContext";

interface TaskItemWrapperProps {
  task: {
    id: number;
    title: string;
    project?: {
      id: number;
      title: string;
    };
    assignee?: {
      id: string;
      fullName: string;
    };
  };
  children: React.ReactNode;
}

export function TaskItemWrapper({ task, children }: TaskItemWrapperProps) {
  return (
    <ModalManagerProvider>
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
                  {children}

                  <TaskDetailModal
                    taskDetailContainer={
                      <TaskDetailContainer taskId={task.id} />
                    }
                  />

                  {task.project && (
                    <ProjectDetailModal
                      projectDetailContainer={
                        <ProjectDetailContainer projectId={task.project.id} />
                      }
                    />
                  )}

                  {task.assignee && (
                    <UpdateUserImageFileProvider>
                      <UpdateUserImageProvider>
                        <ClearUserImageUrlProvider userId={task.assignee.id}>
                          <UserDetailModal
                            userDetailContainer={
                              <UserDetailContainer userId={task.assignee.id} />
                            }
                            userDetailHeaderContainer={
                              <UserDetailHeaderContainer
                                userId={task.assignee.id}
                              />
                            }
                          />

                          <UpdateUserImageModal userId={task.assignee.id} />

                          <DeleteUserImageModal
                            userId={task.assignee.id}
                            userFullName={task.assignee.fullName}
                          />
                        </ClearUserImageUrlProvider>
                      </UpdateUserImageProvider>
                    </UpdateUserImageFileProvider>
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

                  <DeleteTaskModal taskId={task.id} taskTitle={task.title} />
                </UpdateCommentProvider>
              </SendCommentProvider>
            </CommentFormProvider>
          </UpdateTaskStatusProvider>
        </DeleteTaskProvider>
      </UpdateTaskProvider>

      <GuestModeModal />
    </ModalManagerProvider>
  );
}
