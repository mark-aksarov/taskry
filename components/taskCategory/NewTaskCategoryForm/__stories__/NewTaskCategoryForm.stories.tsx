import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewTaskCategoryForm } from "../NewTaskCategoryForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";

const meta = {
  title: "components/task-categories/NewTaskCategoryForm",
  component: NewTaskCategoryForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof NewTaskCategoryForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createTaskCategory: () => ({ status: "success" }),
  },
} satisfies Story;
