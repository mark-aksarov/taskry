import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserTaskListItemSkeleton } from "../UserTaskListItemSkeleton";

const meta = {
  title: "dashboard/users/UserTaskListItemSkeleton",
  component: UserTaskListItemSkeleton,
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UserTaskListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
