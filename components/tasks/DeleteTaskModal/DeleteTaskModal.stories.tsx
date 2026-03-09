import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DeleteTaskModal } from "../DeleteTaskModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteTaskProvider } from "../DeleteTaskContext/__stories__";
import { withSelectedTasksProvider } from "../SelectedTasksContext/__stories__";

const meta = {
  title: "components/tasks/DeleteTaskModal",
  component: DeleteTaskModal,
  decorators: [
    withDeleteTaskProvider,
    withSelectedTasksProvider,
    withThemedBackground,
  ],
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button label="Delete task" onClick={() => setOpen(true)} />
        <DeleteTaskModal {...args} isOpen={open} onOpenChange={setOpen} />
      </>
    );
  },
} satisfies Meta<typeof DeleteTaskModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskId: 1,
    taskTitle: "Task 1",
    isOpen: true,
    onOpenChange: () => {},
  },
} satisfies Story;
