import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TotalTasksCard } from "./TotalTasksCard";

const meta = {
  title: "dashboard/tasks/TotalTasksCard",
  component: TotalTasksCard,
  args: {
    totalTasks: 500,
  },
} satisfies Meta<typeof TotalTasksCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
