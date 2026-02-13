import { EditSubtaskForm } from "../EditSubtaskForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withOverlayTriggerStateProvider } from "@/.storybook/withOverlayTriggerStateProvider";

const meta = {
  title: "components/subtasks/EditSubtaskForm",
  component: EditSubtaskForm,
  decorators: [withOverlayTriggerStateProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof EditSubtaskForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    subtaskId: 1,
    taskId: 1,
    textDefaultValue: "Subtask text",
    updateSubtask: () => ({ status: "success" }),
  },
} satisfies Story;
