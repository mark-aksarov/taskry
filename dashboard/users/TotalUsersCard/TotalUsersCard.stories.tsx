import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalUsersCard } from "./TotalUsersCard";

const meta = {
  title: "dashboard/users/TotalUsersCard",
  component: TotalUsersCard,
  args: {
    totalUsers: 15,
  },
} satisfies Meta<typeof TotalUsersCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
