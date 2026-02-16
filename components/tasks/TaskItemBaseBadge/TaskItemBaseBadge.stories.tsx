import { Meta, StoryObj } from "@storybook/react";
import { TaskItemBaseBadge } from "./TaskItemBaseBadge";
import { withUpdateTaskStatusProvider } from "../UpdateTaskStatusContext/__stories__/withUpdateTaskStatusProvider";

const meta: Meta<typeof TaskItemBaseBadge> = {
  title: "components/tasks/TaskItemBaseBadge",
  component: TaskItemBaseBadge,
  decorators: [withUpdateTaskStatusProvider],
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
