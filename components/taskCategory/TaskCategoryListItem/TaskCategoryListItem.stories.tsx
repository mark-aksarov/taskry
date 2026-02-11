import { Meta, StoryObj } from "@storybook/react";
import { TaskCategoryListItem } from "./TaskCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoryItemActionMenuTrigger } from "../TaskCategoryItemActionMenuTrigger";

const meta = {
  title: "components/task-categories/TaskCategoryListItem",
  component: TaskCategoryListItem,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskCategoryListItem>;

export default meta;
type Story = StoryObj<typeof TaskCategoryListItem>;

export const Default = {
  args: {
    id: 1,
    name: "Frontend",
    menuTrigger: (
      <TaskCategoryItemActionMenuTrigger
        guestMode={false}
        taskId={1}
        taskCategoryName="Frontend"
      />
    ),
  },
} satisfies Story;
