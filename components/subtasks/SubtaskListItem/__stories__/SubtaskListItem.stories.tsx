import { SubtaskListItem } from "../SubtaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteSubtaskProvider } from "../../DeleteSubtaskProvider/__stories__";
import { withUpdateSubtaskProvider } from "../../UpdateSubtaskProvider/__stories__";
import { withToggleSubtaskProvider } from "../../ToggleSubtaskProvider/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";

const meta = {
  title: "components/subtasks/SubtaskListItem",
  component: SubtaskListItem,
  decorators: [
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
} satisfies Meta<typeof SubtaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isDone: false,
    id: 1,
    text: "Subtask 1",
  },
} satisfies Story;

export const IsDone = {
  args: {
    ...Default.args,
    isDone: true,
  },
} satisfies Story;
