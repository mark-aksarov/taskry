import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewTaskCategoryForm } from "../NewTaskCategoryForm";
import { NewTaskCategoryModal } from "./NewTaskCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as NewTaskCategoryFormStory } from "../NewTaskCategoryForm/NewTaskCategoryForm.stories";

const meta = {
  title: "Components/task-categories/NewTaskCategoryModal",
  component: NewTaskCategoryModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="New Task" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof NewTaskCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newTaskCategoryForm: (
      <NewTaskCategoryForm {...NewTaskCategoryFormStory.args} />
    ),
  },
} satisfies Story;
