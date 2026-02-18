import type { Meta, StoryObj } from "@storybook/react";
import { TaskSearchListItem } from "./TaskSearchListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/search/TaskSearchListItem",
  component: TaskSearchListItem,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskSearchListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    title: "Task 1",
    deadline: new Date("2025-09-30"),
  },
} satisfies Story;
