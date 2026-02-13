import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectToolbarActionsMenuTrigger } from "../ProjectToolbarActionsMenuTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/ProjectToolbarActionsMenuTrigger",
  component: ProjectToolbarActionsMenuTrigger,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectToolbarActionsMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    deleteAction: () => ({ status: "success" }),
    updateStatusAction: () => ({ status: "success" }),
  },
} satisfies Story;
