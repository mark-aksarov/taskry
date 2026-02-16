import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskToolbarActionsMenuTrigger } from "../TaskToolbarActionsMenuTrigger";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";

const meta = {
  title: "components/tasks/TaskToolbarActionsMenuTrigger",
  component: TaskToolbarActionsMenuTrigger,
  decorators: [withSelectedTasksProvider, withThemedBackground],
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
