import { DeleteTaskModal } from "../DeleteTaskModal";
import { UpdateTaskModal } from "../UpdateTaskModal";
import { TaskDetailModal } from "../TaskDetailModal";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { UpdateTaskProvider } from "../UpdateTaskProvider";
import { DeleteTaskProvider } from "../DeleteTaskProvider";
import { TaskDetailContainer } from "../TaskDetailContainer";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { TaskCommentsContainer } from "../TaskCommentsContainer";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { UpdateTaskFormContainer } from "../UpdateTaskFormContainer";
import { UpdateTaskStatusProvider } from "../UpdateTaskStatusProvider";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { ModalManagerProvider } from "@/components/common/ModalManagerContext";
import { ProjectDetailContainer } from "@/components/projects/ProjectDetailContainer";
import { UserDetailHeaderContainer } from "@/components/users/UserDetailHeaderContainer";

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
            {children}

            <TaskDetailModal
              taskId={task.id}
              taskDetailContainer={<TaskDetailContainer taskId={task.id} />}
            />

            {task.project && (
              <ProjectDetailModal
                projectId={task.project.id}
                projectDetailContainer={
                  <ProjectDetailContainer projectId={task.project.id} />
                }
              />
            )}

            {task.assignee && (
              <UserDetailModal
                userId={task.assignee.id}
                userDetailContainer={
                  <UserDetailContainer userId={task.assignee.id} />
                }
                userDetailHeaderContainer={
                  <UserDetailHeaderContainer userId={task.assignee.id} />
                }
              />
            )}

            <TaskCommentsModal
              taskId={task.id}
              taskCommentsContainer={<TaskCommentsContainer taskId={task.id} />}
              sendComment={sendComment}
              updateComment={updateComment}
            />

            <UpdateTaskModal
              updateTaskFormContainer={
                <UpdateTaskFormContainer taskId={task.id} />
              }
            />

            <DeleteTaskModal taskId={task.id} taskTitle={task.title} />
          </UpdateTaskStatusProvider>
        </DeleteTaskProvider>
      </UpdateTaskProvider>
    </ModalManagerProvider>
  );
}
