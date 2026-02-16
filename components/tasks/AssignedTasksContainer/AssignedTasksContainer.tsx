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
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { DeleteTaskModalProvider } from "../DeleteTaskModal";
import { TaskDetailContainer } from "../TaskDetailContainer";
import { NewTaskFormContainer } from "../NewTaskFormContainer";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { EditTaskFormContainer } from "../EditTaskFormContainer";
import { TaskCommentsContainer } from "../TaskCommentsContainer";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { ProjectDetailContainer } from "@/components/projects/ProjectDetailContainer";

interface AssignedTasksContainerProps {
  tasks: TaskListItemDTO[];
  totalCount: number;
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
  tasks,
  totalCount,
  page,
  pageSize,
}: AssignedTasksContainerProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const guestMode = await hasGuestRole();

  if (!totalCount) {
    return (
      <AssignedTasksEmptySection
        newTaskFormContainer={<NewTaskFormContainer />}
      />
    );
  }

  return (
    <DeleteTaskModalProvider deleteTask={deleteTasks}>
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
                updateTaskStatus={updateTaskStatuses}
                taskDetailModal={
                  <TaskDetailModal
                    taskId={task.id}
                    taskDetailContainer={
                      <TaskDetailContainer
                        guestMode={guestMode}
                        taskId={task.id}
                      />
                    }
                  />
                }
                commentsCount={task.commentsCount}
                taskCommentsModal={
                  <TaskCommentsModal
                    taskId={task.id}
                    taskCommentsContainer={
                      <TaskCommentsContainer
                        guestMode={guestMode}
                        taskId={task.id}
                      />
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
                    guestMode={guestMode}
                    taskId={task.id}
                    taskTitle={task.title}
                    taskStatus={task.status}
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
    </DeleteTaskModalProvider>
  );
}
