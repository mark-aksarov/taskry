import { SubtaskListItem } from "../SubtaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteSubtaskModalProvider } from "../../DeleteSubtaskModal/__stories__";

const meta = {
  title: "components/subtasks/SubtaskListItem",
  component: SubtaskListItem,
  decorators: [withDeleteSubtaskModalProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof SubtaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isDone: false,
    id: 1,
    text: "Subtask 1",
    taskId: 1,
    toggleSubtask: () => ({ status: "success" }),
    updateSubtask: () => ({ status: "success" }),
    guestMode: false,
  },
} satisfies Story;

export const IsDone = {
  args: {
    ...Default.args,
    isDone: true,
  },
} satisfies Story;
