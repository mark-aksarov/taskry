import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { EditSubtaskForm } from "../EditSubtaskForm";
import { EditSubtaskModal } from "./EditSubtaskModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { editSubtaskFormArgs } from "../EditSubtaskForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/subtasks/EditSubtaskModal",
  component: EditSubtaskModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="Edit subtask" />
          <Story />
        </DialogTrigger>
      );
    },
    withThemedBackground,
  ],
} satisfies Meta<typeof EditSubtaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    editSubtaskForm: <EditSubtaskForm {...editSubtaskFormArgs} />,
  },
} satisfies Story;
