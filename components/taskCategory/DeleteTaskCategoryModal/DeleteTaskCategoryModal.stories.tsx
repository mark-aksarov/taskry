import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { DeleteTaskCategoryModal } from "./DeleteTaskCategoryModal";

const meta = {
  title: "components/task-categories/DeleteTaskCategoryModal",
  component: DeleteTaskCategoryModal,
  decorators: [withToastRegion, withThemedBackground],
  render: (args) => {
    const [open, setOpen] = useState(false);

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
    taskCategoryName: "Web Development",
    onOpenChange: () => {},
    deleteTaskCategories: () => ({ status: "success" }),
  },
} satisfies Story;

export const WithError = {
  args: {
    ...Default.args,
    deleteTaskCategories: () => ({
      status: "error",
      errorCode: "validationError",
    }),
  },
} satisfies Story;
