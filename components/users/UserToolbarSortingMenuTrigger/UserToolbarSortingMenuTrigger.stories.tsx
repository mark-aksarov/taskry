import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UserToolbarSortingMenuTrigger } from "./UserToolbarSortingMenuTrigger";

const meta = {
  title: "Components/users/UserToolbarSortingMenuTrigger",
  component: UserToolbarSortingMenuTrigger,
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserToolbarSortingMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
