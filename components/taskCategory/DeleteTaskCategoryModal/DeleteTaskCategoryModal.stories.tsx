import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { DeleteTaskCategoryModal } from "../DeleteTaskCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/task-categories/DeleteTaskCategoryModal",
  component: DeleteTaskCategoryModal,
  decorators: [withToastRegion, withThemedBackground],
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button label="Delete task category" onClick={() => setOpen(true)} />
        <DeleteTaskCategoryModal
          {...args}
          isOpen={open}
          onOpenChange={setOpen}
        />
      </>
    );
  },
} satisfies Meta<typeof DeleteTaskCategoryModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskCategoryId: 1,
    taskCategoryName: "Task category 1",
    isOpen: true,
    onOpenChange: () => {},
  },
} satisfies Story;
