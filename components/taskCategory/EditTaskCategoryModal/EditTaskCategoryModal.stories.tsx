import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditTaskCategoryForm } from "../EditTaskCategoryForm";
import { EditTaskCategoryModal } from "./EditTaskCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { EditTaskCategoryFormStory } from "../EditTaskCategoryForm/__stories__";

const meta = {
  title: "Components/task-categories/EditTaskCategoryModal",
  component: EditTaskCategoryModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="Edit task" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof EditTaskCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    editTaskCategoryForm: (
      <EditTaskCategoryForm {...EditTaskCategoryFormStory.args} />
    ),
  },
} satisfies Story;
