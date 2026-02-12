import { Meta, StoryObj } from "@storybook/react";
import { TaskCategoryListItem } from "../TaskCategoryListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoryItemActionMenuTrigger } from "../../TaskCategoryItemActionMenuTrigger";
import { TaskCategoryItemActionMenuTriggerStory } from "../../TaskCategoryItemActionMenuTrigger/__stories__";

const meta = {
  title: "components/task-categories/TaskCategoryListItem",
  component: TaskCategoryListItem,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskCategoryListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    name: "Frontend",
    menuTrigger: (
      <TaskCategoryItemActionMenuTrigger
        {...TaskCategoryItemActionMenuTriggerStory.args}
      />
    ),
  },
} satisfies Story;
