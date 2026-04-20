import { mockedTaskList } from "@/mocks/tasks";
import { TaskStatus } from "@/generated/prisma/enums";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItemLarge } from "../TaskGridItemLarge";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateTaskProvider } from "../../UpdateTaskProvider/__stories__";
import { withDeleteTaskProvider } from "../../DeleteTaskProvider/__stories__";
import { withDeleteTasksProvider } from "../../DeleteTasksProvider/__stories__";
import { withViewModeProvider } from "@/dashboard/common/ViewMode/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { withUpdateTaskStatusProvider } from "../../UpdateTaskStatusProvider/__stories__";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withUpdateTaskStatusesProvider } from "../../UpdateTaskStatusesProvider/__stories__";
import { withModalManagerProvider } from "@/dashboard/common/ModalManagerContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "dashboard/tasks/TaskGridItemLarge",
  component: TaskGridItemLarge,
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
  parameters: {
    viewMode: "grid",
  },
} satisfies Meta<typeof TaskGridItemLarge>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockedTask = mockedTaskList[0];

export const Default = {
  args: {
    ...mockedTask,
    subtasksTotal: mockedTask.subtasks.total,
    subtasksDone: mockedTask.subtasks.done,
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
