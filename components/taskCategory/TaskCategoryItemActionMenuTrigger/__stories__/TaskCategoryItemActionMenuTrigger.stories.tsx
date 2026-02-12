import { Meta, StoryObj } from "@storybook/react";
import { EditTaskCategoryForm } from "../../EditTaskCategoryForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { EditTaskCategoryFormStory } from "../../EditTaskCategoryForm/__stories__";
import { TaskCategoryItemActionMenuTrigger } from "../TaskCategoryItemActionMenuTrigger";

const meta = {
  title: "components/task-categories/TaskCategoryItemActionMenuTrigger",
  component: TaskCategoryItemActionMenuTrigger,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskCategoryItemActionMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    taskCategoryId: 1,
    taskCategoryName: "Frontend",
    editTaskCategoryForm: (
      <EditTaskCategoryForm {...EditTaskCategoryFormStory.args} />
    ),
  },
} satisfies Story;
