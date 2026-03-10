import { SubtaskListItem } from "../SubtaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";

const meta = {
  title: "components/subtasks/SubtaskListItem",
  component: SubtaskListItem,
  decorators: [
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withThemedBackground,
  ],
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
    deleteSubtask: () => ({ status: "success" }),
  },
} satisfies Story;

export const IsDone = {
  args: {
    ...Default.args,
    isDone: true,
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
