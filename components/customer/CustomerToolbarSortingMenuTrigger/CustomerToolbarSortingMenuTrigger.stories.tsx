import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerToolbarSortingMenuTrigger } from "./CustomerToolbarSortingMenuTrigger";

const meta = {
  title: "components/customers/CustomerToolbarSortingMenuTrigger",
  component: CustomerToolbarSortingMenuTrigger,
  decorators: [withThemedBackground],
} satisfies Meta<typeof CustomerToolbarSortingMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    selectedSortField: "fullName",
  },
} satisfies Story;
