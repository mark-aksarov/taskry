import { TaskDetail } from "../../TaskDetail";
import { TaskGridItem } from "../TaskGridItem";
import { mockedTaskList } from "@/mocks/tasks";
import { mockedUserDetail } from "@/mocks/users";
import { EditTaskForm } from "../../EditTaskForm";
import { TaskStatus } from "@/generated/prisma/enums";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserDetail } from "@/components/users/UserDetail";
import { taskDetailArgs } from "../../TaskDetail/__stories__";
import { editTaskFormArgs } from "../../EditTaskForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { getCommentList } from "@/components/comments/CommentList/__stories__";
import { withDeleteTaskModalProvider } from "../../DeleteTaskModal/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { withUpdateTaskStatusesProvider } from "../../UpdateTaskStatusContext/__stories__";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";

const meta = {
  title: "components/tasks/TaskGridItem",
  component: TaskGridItem,
  decorators: [
    withSelectedTasksProvider,
    withDeleteTaskModalProvider,
    withDeleteCommentModalProvider,
    withUpdateTaskStatusesProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskGridItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const task = mockedTaskList[0];

export const Default = {
  args: {
    ...task,
    subtasksTotal: task.subtasks.total,
    subtasksDone: task.subtasks.done,
    guestMode: false,
    taskCommentsContainer: getCommentList(),
    editTaskFormContainer: <EditTaskForm {...editTaskFormArgs} />,
    taskDetailContainer: <TaskDetail {...taskDetailArgs} />,
    userDetailContainer: <UserDetail {...mockedUserDetail} />,
    sendComment: () => ({ status: "success" }),
    updateComment: () => ({ status: "success" }),
    updateTaskStatus: () => {
      return new Promise((res) =>
        setTimeout(() => res({ status: "success" }), 500),
      );
    },
  },
} satisfies Story;

export const WithoutAssignee = {
  args: {
    ...Default.args,
    assignee: undefined,
  },
} satisfies Story;

export const WithoutAssigneeImage = {
  args: {
    ...Default.args,
    assignee: {
      id: "user-3",
      fullName: "User 3",
      imageUrl: undefined,
    },
  },
} satisfies Story;

export const WithActiveStatus = {
  args: {
    ...Default.args,
    status: TaskStatus.active,
  },
} satisfies Story;

export const WithCompletedStatus = {
  args: {
    ...Default.args,
    status: TaskStatus.completed,
  },
} satisfies Story;
