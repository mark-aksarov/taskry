import { Meta, StoryObj } from "@storybook/react";
import { NewTaskCategoryForm } from "../../NewTaskCategoryForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NewTaskCategoryFormStory } from "../../NewTaskCategoryForm/__stories__";
import { TaskCategoryToolbarCreateNewModalTrigger } from "../TaskCategoryToolbarCreateNewModalTrigger";

const meta = {
  title: "components/task-categories/TaskCategoryToolbarCreateNewModalTrigger",
  component: TaskCategoryToolbarCreateNewModalTrigger,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskCategoryToolbarCreateNewModalTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    newTaskCategoryForm: (
      <NewTaskCategoryForm {...NewTaskCategoryFormStory.args} />
    ),
  },
} satisfies Story;
