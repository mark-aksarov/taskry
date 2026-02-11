import { Meta, StoryObj } from "@storybook/react";
import { NewTaskCategoryForm } from "../../NewTaskCategoryForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskCategoryToolbarCreateNewButton } from "../TaskCategoryToolbarCreateNewButton";
import { Default as NewTaskCategoryFormStory } from "../../NewTaskCategoryForm/NewTaskCategoryForm.stories";

const meta = {
  title: "components/task-categories/TaskCategoryToolbarCreateNewButton",
  component: TaskCategoryToolbarCreateNewButton,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskCategoryToolbarCreateNewButton>;

export default meta;
type Story = StoryObj<typeof TaskCategoryToolbarCreateNewButton>;

export const Default = {
  args: {
    guestMode: false,
    newTaskCategoryForm: (
      <NewTaskCategoryForm {...NewTaskCategoryFormStory.args} />
    ),
  },
} satisfies Story;
