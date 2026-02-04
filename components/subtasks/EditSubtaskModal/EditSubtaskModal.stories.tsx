import { Button } from "@/components/ui/Button";
import { EditSubtaskForm } from "../EditSubtaskForm";
import { EditSubtaskModal } from "./EditSubtaskModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as EditSubtaskFormStory } from "../EditSubtaskForm/EditSubtaskForm.stories";

const meta = {
  title: "components/subtasks/EditSubtaskModal",
  component: EditSubtaskModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="New subtask" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof EditSubtaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    editSubtaskForm: <EditSubtaskForm {...EditSubtaskFormStory.args} />,
  },
} satisfies Story;
