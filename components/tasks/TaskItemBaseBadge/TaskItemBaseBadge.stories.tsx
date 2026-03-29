import { Meta, StoryObj } from "@storybook/react";
import { TaskItemBaseBadge } from "./TaskItemBaseBadge";
import { withSelectedTasksProvider } from "../SelectedTasksContext/__stories__";
import { withUpdateTaskStatusProvider } from "../UpdateTaskStatusProvider/__stories__";
import { withUpdateTaskStatusesProvider } from "../UpdateTaskStatusesProvider/__stories__";

const meta: Meta<typeof TaskItemBaseBadge> = {
  title: "components/tasks/TaskItemBaseBadge",
  component: TaskItemBaseBadge,
  decorators: [
    withUpdateTaskStatusProvider,
    withUpdateTaskStatusesProvider,
    withSelectedTasksProvider,
  ],
} satisfies Meta<typeof TaskItemBaseBadge>;

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
