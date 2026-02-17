import { Meta, StoryObj } from "@storybook/react";
import { EditSubtaskForm } from "../../EditSubtaskForm";
import { SubtaskActionMenuTrigger } from "../SubtaskActionMenuTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { EditSubtaskFormStory } from "../../EditSubtaskForm/__stories__";
import { withDeleteSubtaskModalProvider } from "../../DeleteSubtaskModal/__stories__";

const meta = {
  title: "components/subtasks/SubtaskActionMenuTrigger",
  component: SubtaskActionMenuTrigger,
  decorators: [withDeleteSubtaskModalProvider, withThemedBackground],
} satisfies Meta<typeof SubtaskActionMenuTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    guestMode: false,
    subtaskId: 1,
    isDone: false,
    subtaskText: "Subtask",
    toggleSubtaskAction: () => ({ status: "success" }),
    editSubtaskForm: <EditSubtaskForm {...EditSubtaskFormStory.args} />,
    mutate: () => {},
  },
} satisfies Story;
