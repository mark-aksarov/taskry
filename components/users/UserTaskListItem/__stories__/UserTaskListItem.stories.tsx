import { mockedUserSummaries } from "@/mocks/users";
import { UserTaskListItem } from "../UserTaskListItem";
import type { Meta, StoryObj } from "@storybook/react";
import { mockedProjectSummaries } from "@/mocks/projects";
import { TaskDetail } from "@/components/tasks/TaskDetail";
import { EditTaskForm } from "@/components/tasks/EditTaskForm";
import { CommentList } from "@/components/comments/CommentList";
import { SubtaskList } from "@/components/subtasks/SubtaskList";
import { mockedTaskDetail, mockedTaskList } from "@/mocks/tasks";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SubtaskListStory } from "@/components/subtasks/SubtaskList/__stories__";
import { CommentListStory } from "@/components/comments/CommentList/__stories__";
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

const mockedTask = mockedTaskList[0];

export const Default = {
  args: {
    ...mockedTask,
    taskDetailContainer: (
      <TaskDetail
        {...mockedTaskDetail}
        subtasksList={<SubtaskList {...SubtaskListStory.args} />}
      />
    ),
    taskCommentsContainer: <CommentList {...CommentListStory.args} />,
    editTaskFormContainer: (
      <EditTaskForm
        {...mockedTaskDetail}
        taskId={mockedTaskDetail.id}
        taskCategorySelectItems={mockedTaskCategorySummaries}
        taskProjectSelectItems={mockedProjectSummaries}
        taskAssigneeSelectItems={mockedUserSummaries}
      />
    ),
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
