import "server-only";

import { TaskList } from "../TaskList";
import { TaskGrid } from "../TaskGrid";
import { TaskFilters } from "@/lib/types";
import { TaskListItem } from "../TaskListItem";
import { TaskGridItem } from "../TaskGridItem";
import { TaskDetailModal } from "../TaskDetailModal";
import { getTaskList } from "@/lib/data/task/task.dal";
import { hasGuestRole } from "@/lib/utils/hasGuestRole";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { deleteTasks } from "@/lib/actions/task/deleteTasks";
import { TaskDetailContainer } from "../TaskDetailContainer";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { EditTaskFormContainer } from "../EditTaskFormContainer";
import { TaskDetailBottomSheet } from "../TaskDetailBottomSheet";
import { TaskCommentsContainer } from "../TaskCommentsContainer";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { TaskCommentsModalTrigger } from "../TaskCommentsModalTrigger";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";
import { updateTaskStatuses } from "@/lib/actions/task/updateTaskStatuses";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { UserDetailBottomSheet } from "@/components/users/UserDetailBottomSheet";
import { ProjectDetailContainer } from "@/components/projects/ProjectDetailContainer";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";

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

  const guestMode = await hasGuestRole();

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
                taskDetailBottomSheet={
                  <TaskDetailBottomSheet
                    taskId={task.id}
                    taskDetailContainer={
                      <TaskDetailContainer
                        taskId={task.id}
                        guestMode={guestMode}
                      />
                    }
                  />
                }
                commentModalTrigger={
                  <TaskCommentsModalTrigger
                    taskId={task.id}
                    commentsCount={task.commentsCount}
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
                    deleteAction={deleteTasks}
                    updateStatusAction={updateTaskStatuses}
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
              taskDetailBottomSheet={
                <TaskDetailBottomSheet
                  taskId={task.id}
                  taskDetailContainer={
                    <TaskDetailContainer
                      taskId={task.id}
                      guestMode={guestMode}
                    />
                  }
                />
              }
              commentModalTrigger={
                <TaskCommentsModalTrigger
                  taskId={task.id}
                  commentsCount={task.commentsCount}
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
                  deleteAction={deleteTasks}
                  updateStatusAction={updateTaskStatuses}
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
              userDetailBottomSheet={
                task.assignee && (
                  <UserDetailBottomSheet
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
  );
}
