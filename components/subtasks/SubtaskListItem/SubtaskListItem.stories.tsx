import { fn } from "storybook/test";
import { SubtaskListItem } from "./SubtaskListItem";
import { EditSubtaskForm } from "../EditSubtaskForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtaskActionMenuTrigger } from "../SubtaskActionMenuTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as EditSubtaskFormStory } from "../EditSubtaskForm/EditSubtaskForm.stories";

interface SubtaskListItemStoryArgs {
  id: number;
  text: string;
  isDone: boolean;
}

const meta = {
  title: "components/subtasks/SubtaskListItem",
  decorators: [withThemedBackground],
  render: (args) => (
    <SubtaskListItem
      {...args}
      subtaskText={args.text}
      actionMenuTrigger={
        <SubtaskActionMenuTrigger
          guestMode={true}
          subtaskId={args.id}
          isDone={args.isDone}
          subtaskText={args.text}
          deleteAction={fn()}
          toggleSubtaskAction={fn()}
          editSubtaskForm={<EditSubtaskForm {...EditSubtaskFormStory.args} />}
          mutate={fn()}
        />
      }
    />
  ),
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<SubtaskListItemStoryArgs>;

export default meta;
type Story = StoryObj<SubtaskListItemStoryArgs>;

export const Default = {
  args: {
    id: 1,
    text: "Design landing page",
    isDone: false,
  },
} satisfies Story;

export const IsDone = {
  args: {
    ...Default.args,
    isDone: true,
  },
} satisfies Story;
