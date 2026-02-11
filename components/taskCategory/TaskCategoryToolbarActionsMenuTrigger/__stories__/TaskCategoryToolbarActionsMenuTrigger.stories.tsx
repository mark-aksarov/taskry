import { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoryToolbarActionsMenuTrigger } from "../TaskCategoryToolbarActionsMenuTrigger";

const meta = {
  title: "components/task-categories/TaskCategoryToolbarActionsMenuTrigger",
  component: TaskCategoryToolbarActionsMenuTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskCategoryToolbarActionsMenuTrigger>;

export default meta;
type Story = StoryObj<typeof TaskCategoryToolbarActionsMenuTrigger>;

export const Default = {
  args: {
    guestMode: false,
  },
} satisfies Story;
