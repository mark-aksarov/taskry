import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskItemStatusBadge } from "./TaskItemStatusBadge";
import { withSelectedTasksProvider } from "../SelectedTasksContext/__stories__";
import { withUpdateTaskStatusProvider } from "../UpdateTaskStatusProvider/__stories__";
import { withUpdateTaskStatusesProvider } from "../UpdateTaskStatusesProvider/__stories__";

const meta: Meta<typeof TaskItemStatusBadge> = {
  title: "components/tasks/TaskItemStatusBadge",
  component: TaskItemStatusBadge,
  decorators: [
    withUpdateTaskStatusProvider,
    withUpdateTaskStatusesProvider,
    withSelectedTasksProvider,
  ],
} satisfies Meta<typeof TaskItemStatusBadge>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Pending = {
  args: {
    status: "pending",
  },
} satisfies Story;

export const Active = {
  args: {
    status: "active",
  },
} satisfies Story;

export const Done = {
  args: {
    status: "completed",
  },
} satisfies Story;
