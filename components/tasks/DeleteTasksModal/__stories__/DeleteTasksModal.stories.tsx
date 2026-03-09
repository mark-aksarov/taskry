import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { DeleteTasksModal } from "../DeleteTasksModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteTasksProvider } from "../../DeleteTasksContext/__stories__";
import { withSelectedTasksProvider } from "../../SelectedTasksContext/__stories__";

const meta = {
  title: "components/tasks/DeleteTasksModal",
  component: DeleteTasksModal,
  decorators: [
    withDeleteTasksProvider,
    withSelectedTasksProvider,
    withThemedBackground,
  ],
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button label="Delete tasks" onClick={() => setOpen(true)} />
        <DeleteTasksModal {...args} isOpen={open} onOpenChange={setOpen} />
      </>
    );
  },
} satisfies Meta<typeof DeleteTasksModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isOpen: true,
    onOpenChange: () => {},
  },
} satisfies Story;
