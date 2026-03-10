import { mockedTaskList } from "@/mocks/tasks";
import { UserTaskListItem } from "../UserTaskListItem";
import type { Meta, StoryObj } from "@storybook/react";
import { TaskDetail } from "@/components/tasks/TaskDetail";
import { EditTaskForm } from "@/components/tasks/EditTaskForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { taskDetailArgs } from "@/components/tasks/TaskDetail/__stories__";
import { editTaskFormArgs } from "@/components/tasks/EditTaskForm/__stories__";
import { getCommentList } from "@/components/comments/CommentList/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withDeleteTasksProvider } from "@/components/tasks/DeleteTasksContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withSelectedTasksProvider } from "@/components/tasks/SelectedTasksContext/__stories__";
import { withCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskContext/__stories__";
import { withUpdateTaskStatusesProvider } from "@/components/tasks/UpdateTaskStatusesContext/__stories__";

const meta = {
  title: "components/users/UserTaskListItem",
  component: UserTaskListItem,
  decorators: [
    withCreateSubtaskProvider,
    withUpdateTaskStatusesProvider,
    withDeleteTasksProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withSelectedTasksProvider,
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UserTaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const task = mockedTaskList[0];

export const Default = {
  args: {
    ...task,
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
    updateTask: () => ({ status: "success" }),
    deleteTask: () => ({ status: "success" }),
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

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
