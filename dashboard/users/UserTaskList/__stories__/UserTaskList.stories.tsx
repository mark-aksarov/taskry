import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserTaskListExample } from "./UserTaskListExample";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/dashboard/common/ViewMode/__stories__";
import { withCurrentUserProvider } from "@/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
import { withDeleteTasksProvider } from "@/dashboard/tasks/DeleteTasksProvider/__stories__";
import { withSelectedTasksProvider } from "@/dashboard/tasks/SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";
import { withUpdateTaskStatusesProvider } from "@/dashboard/tasks/UpdateTaskStatusesProvider/__stories__";

const meta = {
  title: "dashboard/users/UserTaskList",
  component: UserTaskListExample,
  decorators: [
    withUpdateTaskStatusesProvider,
    withDeleteTasksProvider,
    withViewModeProvider,
    withPageTransitionProvider,
    withSelectedTasksProvider,
    withModalManagerProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UserTaskListExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => <UserTaskListExample />,
} satisfies Story;
