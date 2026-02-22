import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerToolbarSortingMenuTrigger } from "./CustomerToolbarSortingMenuTrigger";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/customers/CustomerToolbarSortingMenuTrigger",
  component: CustomerToolbarSortingMenuTrigger,
  decorators: [
    withPageTransitionProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof CustomerToolbarSortingMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    selectedSortField: "fullName",
  },
} satisfies Story;
