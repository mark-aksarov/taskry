import { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoryItemActionMenuTrigger } from "../TaskCategoryItemActionMenuTrigger";

const meta = {
  title: "components/task-categories/TaskCategoryItemActionMenuTrigger",
  component: TaskCategoryItemActionMenuTrigger,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskCategoryItemActionMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    guestMode: false,
    taskId: 1,
    taskCategoryName: "Frontend",
  },
};
