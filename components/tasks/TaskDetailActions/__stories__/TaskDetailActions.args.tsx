import { getCommentList } from "@/components/comments/CommentList/__stories__";
import { mockedTaskDetail } from "@/mocks/tasks";
import { editTaskFormArgs } from "../../EditTaskForm/__stories__";
import { EditTaskForm } from "../../EditTaskForm";

const task = mockedTaskDetail;

export const taskDetailActionsArgs = {
  taskId: task.id,
  taskTitle: task.title,
  sendComment: () => ({ status: "success" as const }),
  updateComment: () => ({ status: "success" as const }),
  deleteTask: () => ({ status: "success" as const }),
  taskCommentsContainer: getCommentList(),
  editTaskFormContainer: <EditTaskForm {...editTaskFormArgs} />,
};
