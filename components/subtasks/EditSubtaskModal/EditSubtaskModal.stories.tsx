import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { EditSubtaskModal } from "./EditSubtaskModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
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
    subtaskId: 1,
    taskId: 1,
    subtaskText: "Subtask 1",
    isOpen: true,
    onOpenChange: () => {},
  },
} satisfies Story;
