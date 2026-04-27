import { mockedTaskList } from "@/mocks/tasks";
import { TaskListItem } from "../TaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateTaskProvider } from "../../UpdateTaskProvider/__stories__";
import { withDeleteTaskProvider } from "../../DeleteTaskProvider/__stories__";
import { withDeleteTasksProvider } from "../../DeleteTasksProvider/__stories__";
import { withViewModeProvider } from "@/dashboard/common/ViewMode/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { withUpdateTaskStatusProvider } from "../../UpdateTaskStatusProvider/__stories__";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withUpdateTaskStatusesProvider } from "../../UpdateTaskStatusesProvider/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const mockedTask = mockedTaskList[0];

const meta = {
  title: "dashboard/tasks/TaskListItem",
  component: TaskListItem,
  decorators: [
    withUpdateTaskStatusProvider,
    withUpdateTaskProvider,
    withDeleteTaskProvider,
    withDeleteTasksProvider,
    withUpdateTaskStatusesProvider,
    withCurrentUserProvider,
    withSelectedTasksProvider,
    withViewModeProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof TaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedTask,
    showCheckbox: false,
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
