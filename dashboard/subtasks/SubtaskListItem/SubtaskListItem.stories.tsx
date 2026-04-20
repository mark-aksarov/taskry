import { SubtaskListItem } from "../SubtaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteSubtaskProvider } from "../DeleteSubtaskProvider/__stories__";
import { withUpdateSubtaskProvider } from "../UpdateSubtaskProvider/__stories__";
import { withToggleSubtaskProvider } from "../ToggleSubtaskProvider/__stories__";
import { withDeleteTaskProvider } from "@/dashboard/tasks/DeleteTaskProvider/__stories__";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/dashboard/common/ModalManagerContext/__stories__";

const meta = {
  title: "components/subtasks/SubtaskListItem",
  component: SubtaskListItem,
  decorators: [
    withDeleteTaskProvider,
    withDeleteSubtaskProvider,
    withUpdateSubtaskProvider,
    withToggleSubtaskProvider,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
  args: {
    id: 1,
    text: "Subtask placeholder text 1",
  },
} satisfies Meta<typeof SubtaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutActionMenu = {
  args: {
    isDone: false,
    showActionMenu: false,
  },
} satisfies Story;

export const Plain = {
  args: {
    isDone: false,
  },
} satisfies Story;

export const PlainIsDone = {
  args: {
    isDone: true,
  },
} satisfies Story;

export const Rich = {
  args: {
    variant: "rich",
    isDone: false,
  },
} satisfies Story;

export const RichIsDone = {
  args: {
    variant: "rich",
    isDone: true,
  },
} satisfies Story;
