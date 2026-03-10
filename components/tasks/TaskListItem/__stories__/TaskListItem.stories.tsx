import { TaskDetail } from "../../TaskDetail";
import { mockedTaskList } from "@/mocks/tasks";
import { TaskListItem } from "../TaskListItem";
import { mockedUserDetail } from "@/mocks/users";
import { EditTaskForm } from "../../EditTaskForm";
import { mockedProjectDetail } from "@/mocks/projects";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserDetail } from "@/components/users/UserDetail";
import { taskDetailArgs } from "../../TaskDetail/__stories__";
import { editTaskFormArgs } from "../../EditTaskForm/__stories__";
import { withTaskItemProviders } from "../../TaskItem/__stories__";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { getCommentList } from "@/components/comments/CommentList/__stories__";
import { withDeleteTasksProvider } from "../../DeleteTasksContext/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withUpdateTaskStatusesProvider } from "../../UpdateTaskStatusesContext/__stories__";
import { withCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskContext/__stories__";

const meta = {
  title: "components/tasks/TaskListItem",
  component: TaskListItem,
  decorators: [
    withCreateSubtaskProvider,
    withTaskItemProviders,
    withDeleteTasksProvider,
    withUpdateTaskStatusesProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withSelectedTasksProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const task = mockedTaskList[0];

export const Default = {
  args: {
    ...task,
    taskCommentsContainer: getCommentList(),
    editTaskFormContainer: <EditTaskForm {...editTaskFormArgs} />,
    userDetailContainer: <UserDetail {...mockedUserDetail} />,
    projectDetailContainer: <ProjectDetail {...mockedProjectDetail} />,
    taskDetailContainer: <TaskDetail {...taskDetailArgs} />,
    sendComment: () => ({ status: "success" }),
    updateComment: () => ({ status: "success" }),
  },
} satisfies Story;

export const WithOverflowContent = {
  args: {
    ...Default.args,
    title: "This is a task title with a very long text for layout testing",
    assignee: {
      ...Default.args.assignee!,
      fullName: "This is a user name with a very long text for layout testing",
    },
    project: {
      ...Default.args.project,
      title: "This is a project title with a very long text for layout testing",
    },
    category: {
      ...Default.args.category,
      name: "This is a category name with a very long text for layout testing",
    },
  },
} satisfies Story;

export const WithCheckbox = {
  args: {
    ...Default.args,
    showCheckbox: true,
  },
} satisfies Story;

export const WithoutOptionalTaskData = {
  args: {
    ...Default.args,
    assignee: undefined,
    project: undefined,
    category: undefined,
  },
} satisfies Story;

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
