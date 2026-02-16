import "server-only";

import { TaskList } from "../TaskList";
import { TaskGrid } from "../TaskGrid";
import { TaskListItem } from "../TaskListItem";
import { TaskGridItem } from "../TaskGridItem";
import { TaskDetailModal } from "../TaskDetailModal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { TaskDetailContainer } from "../TaskDetailContainer";
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
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { DeleteTaskModalProvider } from "../DeleteTaskModal";

interface TasksContainerProps {
  tasks: TaskListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export async function TasksContainer({
  tasks,
  totalCount,
  page,
  pageSize,
}: TasksContainerProps) {
  const getCommonProps = (task: TaskListItemDTO) => ({
    id: task.id,
    title: task.title,
    deadline: task.deadline,
    assignee: task.assignee,
    status: task.status,
    commentsCount: task.commentsCount,
    subtasksTotal: task.subtasks.total,
  });

  const guestMode = await hasGuestRole();

  return (
    <DeleteTaskModalProvider deleteTask={deleteTasks}>
      <EntityContainerPresentation
        list={
          <TaskList showCheckbox>
            {tasks.map((task) => {
              return (
                <TaskListItem
                  key={task.id}
                  category={task.category}
                  project={task.project}
                  updateTaskStatus={updateTaskStatuses}
                  taskDetailModal={
                    <TaskDetailModal
                      taskId={task.id}
                      taskDetailContainer={
                        <TaskDetailContainer
                          taskId={task.id}
                          guestMode={guestMode}
                        />
                      }
                    />
                  }
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
                  projectDetailModal={
                    <ProjectDetailModal
                      projectId={task.project.id}
                      projectDetailContainer={
                        <ProjectDetailContainer projectId={task.project.id} />
                      }
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
                updateTaskStatus={updateTaskStatuses}
                taskDetailModal={
                  <TaskDetailModal
                    taskId={task.id}
                    taskDetailContainer={
                      <TaskDetailContainer
                        taskId={task.id}
                        guestMode={guestMode}
                      />
                    }
                  />
                }
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
                menuTrigger={
                  <TaskItemActionMenuTrigger
                    guestMode={guestMode}
                    taskId={task.id}
                    taskTitle={task.title}
                    taskStatus={task.status}
                    editTaskFormContainer={
                      <EditTaskFormContainer taskId={task.id} />
                    }
                    className="-mr-2"
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
                {...getCommonProps(task)}
              />
            ))}
          </TaskGrid>
        }
        page={page}
        pageSize={pageSize}
        totalPages={Math.ceil(totalCount / pageSize)}
      />
    </DeleteTaskModalProvider>
  );
}
