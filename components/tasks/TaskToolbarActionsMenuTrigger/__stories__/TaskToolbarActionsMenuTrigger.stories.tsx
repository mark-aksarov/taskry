import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskToolbarActionsMenuTrigger } from "../TaskToolbarActionsMenuTrigger";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";
import { withUpdateTaskStatusesProvider } from "../../UpdateTaskStatusContext/__stories__";

const meta = {
  title: "components/tasks/TaskToolbarActionsMenuTrigger",
  component: TaskToolbarActionsMenuTrigger,
  decorators: [
    withUpdateTaskStatusesProvider,
    withSelectedTasksProvider,
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskToolbarActionsMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    deleteTasks: () => ({ status: "success" }),
  },
} satisfies Story;
