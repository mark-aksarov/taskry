import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskStatusBadge } from "./TaskStatusBadge";

const meta = {
  title: "Components/projects/TaskStatusBadge",
  component: TaskStatusBadge,
  tags: ["autodocs"],
} satisfies Meta<typeof TaskStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending = {
  args: {
    status: {
      id: 1,
      name: "Pending",
    },
  },
} satisfies Story;

export const Active = {
  args: {
    status: {
      id: 2,
      name: "Active",
    },
  },
} satisfies Story;

export const Completed = {
  args: {
    status: {
      id: 3,
      name: "Completed",
    },
  },
} satisfies Story;
