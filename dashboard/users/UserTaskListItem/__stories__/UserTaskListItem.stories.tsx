import { mockedTaskList } from "@/mocks/tasks";
import { UserTaskListItem } from "../UserTaskListItem";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/dashboard/common/ViewMode/__stories__";
import { withDeleteTaskProvider } from "@/dashboard/tasks/DeleteTaskProvider/__stories__";
import { withUpdateTaskProvider } from "@/dashboard/tasks/UpdateTaskProvider/__stories__";
import { withDeleteTasksProvider } from "@/dashboard/tasks/DeleteTasksProvider/__stories__";
import { withCurrentUserProvider } from "@/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
import { withSelectedTasksProvider } from "@/dashboard/tasks/SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";
import { withUpdateTaskStatusProvider } from "@/dashboard/tasks/UpdateTaskStatusProvider/__stories__";
import { withUpdateTaskStatusesProvider } from "@/dashboard/tasks/UpdateTaskStatusesProvider/__stories__";

const mockedTask = mockedTaskList[0];

const meta = {
  title: "dashboard/users/UserTaskListItem",
  component: UserTaskListItem,
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
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UserTaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedTask,
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
