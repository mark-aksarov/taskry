import type { Meta, StoryObj } from "@storybook/react";
import { TaskSearchListItem } from "./TaskSearchListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/search/TaskSearchListItem",
  component: TaskSearchListItem,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskSearchListItem>;

export default meta;
type Story = StoryObj<typeof TaskSearchListItem>;

export const Default = {
  args: {
    id: 1,
    title: "Design landing page",
    deadline: new Date("2025-09-30"),
  },
} satisfies Story;
