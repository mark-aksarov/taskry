import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskToolbarActionsMenuTrigger } from "../TaskToolbarActionsMenuTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskToolbarActionsMenuTrigger",
  component: TaskToolbarActionsMenuTrigger,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskToolbarActionsMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    deleteAction: () => ({ status: "success" }),
    updateStatusAction: () => ({ status: "success" }),
  },
} satisfies Story;
