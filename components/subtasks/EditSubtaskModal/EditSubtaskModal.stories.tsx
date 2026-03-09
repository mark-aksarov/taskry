import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { EditSubtaskModal } from "./EditSubtaskModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useUpdateSubtask } from "../UpdateSubtaskContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateSubtaskProvider } from "../UpdateSubtaskContext/__stories__";

const meta = {
  title: "components/subtasks/EditSubtaskModal",
  component: EditSubtaskModal,
  decorators: [
    (Story) => {
      const { onModalOpenChange } = useUpdateSubtask();

      useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

      return (
        <>
          <Button
            label="Edit subtask"
            onClick={() => onModalOpenChange(true)}
          />
          <Story />
        </>
      );
    },
    withUpdateSubtaskProvider,
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
  },
} satisfies Story;
