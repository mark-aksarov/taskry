import { TaskStatus } from "@/generated/prisma/enums";
import { UserTaskListItem } from "../UserTaskListItem";
import type { Meta, StoryObj } from "@storybook/react";
import { TaskDetail } from "@/components/tasks/TaskDetail";
import { EditTaskForm } from "@/components/tasks/EditTaskForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { taskDetailArgs } from "@/components/tasks/TaskDetail/__stories__";
import { editTaskFormArgs } from "@/components/tasks/EditTaskForm/__stories__";
import { getCommentList } from "@/components/comments/CommentList/__stories__";
import { withDeleteTaskModalProvider } from "@/components/tasks/DeleteTaskModal/__stories__";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusContext/__stories__";

const meta = {
  title: "components/users/UserTaskListItem",
  component: UserTaskListItem,
  decorators: [
    withSelectedTasksProvider,
    withDeleteTaskModalProvider,
    withDeleteCommentModalProvider,
    withUpdateTaskStatusesProvider,
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UserTaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    title: "Task 1",
    deadline: "2025-09-30",
    status: TaskStatus.pending,
    commentsCount: 10,
    guestMode: false,
    taskDetailContainer: <TaskDetail {...taskDetailArgs} />,
    taskCommentsContainer: getCommentList(),
    editTaskFormContainer: <EditTaskForm {...editTaskFormArgs} />,
    sendComment: () => ({ status: "success" }),
    updateComment: () => ({ status: "success" }),
    updateTaskStatus: () => {
      return new Promise((res) =>
        setTimeout(() => res({ status: "success" }), 500),
      );
    },
  },
} satisfies Story;

export const WithOverflowContent = {
  args: {
    ...Default.args,
    title: "This is a task title with a very long text for layout testing",
  },
};

export const WithActiveStatus = {
  args: {
    ...Default.args,
    status: "active",
  },
} satisfies Story;

export const WithCompletedStatus = {
  args: {
    ...Default.args,
    status: "completed",
  },
} satisfies Story;
