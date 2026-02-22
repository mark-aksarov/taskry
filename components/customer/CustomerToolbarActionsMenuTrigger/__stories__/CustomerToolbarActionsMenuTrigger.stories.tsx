import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerToolbarActionsMenuTrigger } from "../CustomerToolbarActionsMenuTrigger";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/customers/CustomerToolbarActionsMenuTrigger",
  component: CustomerToolbarActionsMenuTrigger,
  decorators: [
    withPageTransitionProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof CustomerToolbarActionsMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    deleteCustomers: () => ({ status: "success" }),
  },
} satisfies Story;
