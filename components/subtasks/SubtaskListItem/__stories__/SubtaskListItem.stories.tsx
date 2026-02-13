import { SubtaskListItem } from "../SubtaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SubtaskActionMenuTrigger } from "../../SubtaskActionMenuTrigger";
import { SubtaskActionMenuTriggerStory } from "../../SubtaskActionMenuTrigger/__stories__";

const meta = {
  title: "components/subtasks/SubtaskListItem",
  component: SubtaskListItem,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof SubtaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isDone: false,
    subtaskText: "Subtask",
    actionMenuTrigger: (
      <SubtaskActionMenuTrigger {...SubtaskActionMenuTriggerStory.args} />
    ),
  },
} satisfies Story;

export const IsDone = {
  args: {
    ...Default.args,
    isDone: true,
  },
} satisfies Story;
