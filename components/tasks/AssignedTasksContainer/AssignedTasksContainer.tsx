import "server-only";

import {
  AssignedTasksPresentation,
  AssignedTasksEmptySection,
  AssignedTasksSkeleton,
} from "../AssignedTasks";

import { Suspense } from "react";
import { AssignedTaskList } from "../AssignedTaskList";
import { updateTask } from "@/lib/actions/task/updateTask";
import { TaskListItemDTO } from "@/lib/data/task/task.dto";
import { deleteTask } from "@/lib/actions/task/deleteTask";
import { TaskDetailContainer } from "../TaskDetailContainer";
import { AssignedTaskListItem } from "../AssignedTaskListItem";
import { NewTaskFormContainer } from "../NewTaskFormContainer";
import { sendComment } from "@/lib/actions/comment/sendComment";
import { EditTaskFormContainer } from "../EditTaskFormContainer";
import { TaskCommentsContainer } from "../TaskCommentsContainer";
import { updateComment } from "@/lib/actions/comment/updateComment";
import { updateTaskStatus } from "@/lib/actions/task/updateTaskStatus";
import { UserDetailContainer } from "@/components/users/UserDetailContainer";
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
  if (!totalCount) {
    return (
      <AssignedTasksEmptySection
        newTaskFormContainer={<NewTaskFormContainer />}
      />
    );
  }

  return (
    <AssignedTasksPresentation
      page={page}
      pageSize={pageSize}
      totalPages={Math.ceil(totalCount / pageSize)}
      list={
        <AssignedTaskList>
          {tasks.map((task) => (
            <AssignedTaskListItem
              key={task.id}
              id={task.id}
              title={task.title}
              deadline={task.deadline}
              category={task.category}
              project={task.project}
              status={task.status}
              assignee={task.assignee}
              taskDetailContainer={<TaskDetailContainer taskId={task.id} />}
              commentsCount={task.commentsCount}
              taskCommentsContainer={<TaskCommentsContainer taskId={task.id} />}
              userDetailContainer={
                task.assignee && (
                  <UserDetailContainer userId={task.assignee.id} />
                )
              }
              projectDetailContainer={
                <ProjectDetailContainer projectId={task.project.id} />
              }
              editTaskFormContainer={<EditTaskFormContainer taskId={task.id} />}
              sendComment={sendComment}
              updateComment={updateComment}
              updateTask={updateTask}
              deleteTask={deleteTask}
              updateTaskStatus={updateTaskStatus}
            />
          ))}
        </AssignedTaskList>
      }
    />
  );
}
