import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditTaskCategoryForm } from "../EditTaskCategoryForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";

const meta = {
  title: "components/task-categories/EditTaskCategoryForm",
  component: EditTaskCategoryForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof EditTaskCategoryForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskCategoryId: 1,
    nameDefaultValue: "Task category 1",
    updateTaskCategory: () => ({ status: "success" }),
  },
} satisfies Story;
