import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerToolbarActionsMenuTrigger } from "../CustomerToolbarActionsMenuTrigger";

const meta = {
  title: "components/customers/CustomerToolbarActionsMenuTrigger",
  component: CustomerToolbarActionsMenuTrigger,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CustomerToolbarActionsMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    deleteAction: () => ({ status: "success" }),
  },
} satisfies Story;
