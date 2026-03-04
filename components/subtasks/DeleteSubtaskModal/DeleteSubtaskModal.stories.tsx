import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DeleteSubtaskModal } from "../DeleteSubtaskModal";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/subtasks/DeleteSubtaskModal",
  component: DeleteSubtaskModal,
  decorators: [withToastRegion, withThemedBackground],
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button label="Delete subtask" onClick={() => setOpen(true)} />
        <DeleteSubtaskModal {...args} isOpen={open} onOpenChange={setOpen} />
      </>
    );
  },
} satisfies Meta<typeof DeleteSubtaskModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    subtaskId: 1,
    subtaskText: "Project Manager",
    isOpen: true,
    onOpenChange: () => {},
  },
} satisfies Story;
