import { SubtaskListItem } from "../SubtaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SubtaskActionMenuTrigger } from "../../SubtaskActionMenuTrigger";
import { withDeleteSubtaskModalProvider } from "../../DeleteSubtaskModal/__stories__";
import { SubtaskActionMenuTriggerStory } from "../../SubtaskActionMenuTrigger/__stories__";

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
    actionMenuTrigger: (
      <SubtaskActionMenuTrigger {...SubtaskActionMenuTriggerStory.args} />
    ),
  },
} satisfies Story;

export const IsDone = {
  args: {
    ...Default.args,
    actionMenuTrigger: (
      <SubtaskActionMenuTrigger
        {...SubtaskActionMenuTriggerStory.args}
        isDone={true}
      />
    ),
    isDone: true,
  },
} satisfies Story;
