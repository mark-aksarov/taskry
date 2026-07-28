import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserListItemSkeleton } from "../UserListItemSkeleton";

const meta = {
  title: "dashboard/users/UserListItemSkeleton",
  component: UserListItemSkeleton,
} satisfies Meta<typeof UserListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
