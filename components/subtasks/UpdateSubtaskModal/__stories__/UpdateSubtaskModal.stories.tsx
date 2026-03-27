import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateSubtaskModal } from "../UpdateSubtaskModal";
import { useUpdateSubtaskModal } from "../UpdateSubtaskModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateSubtaskProvider } from "../../UpdateSubtaskProvider/__stories__";
import { withUpdateSubtaskModalProvider } from "./withUpdateSubtaskModalProvider";

const meta = {
  title: "components/subtasks/UpdateSubtaskModal",
  component: UpdateSubtaskModal,
  decorators: [
    (Story) => {
      const { onOpenChange: onModalOpenChange } = useUpdateSubtaskModal();

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
    withUpdateSubtaskModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UpdateSubtaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    subtaskId: 1,
    taskId: 1,
    subtaskText: "Subtask 1",
  },
} satisfies Story;
