import { TaskGridExample } from "./TaskGridExample";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/dashboard/common/ViewMode/__stories__";
import { withDeleteTasksProvider } from "../../DeleteTasksProvider/__stories__";
import { withCurrentUserProvider } from "@/common/CurrentUserContext/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
import { withUpdateTaskStatusesProvider } from "../../UpdateTaskStatusesProvider/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "dashboard/tasks/TaskGrid",
  component: TaskGridExample,
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
} satisfies Meta<typeof TaskGridExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: (args) => (
    <DashboardGrid>
      <TaskGridExample {...args} />
    </DashboardGrid>
  ),
  args: {
    showCheckbox: true,
  },
} satisfies Story;
