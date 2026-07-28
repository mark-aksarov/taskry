import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalUsersCardSkeleton } from "./TotalUsersCardSkeleton";

const meta = {
  title: "dashboard/users/TotalUsersCardSkeleton",
  component: TotalUsersCardSkeleton,
} satisfies Meta<typeof TotalUsersCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
