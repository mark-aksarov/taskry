import React from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { DeleteTaskCategoriesModal } from "./DeleteTaskCategoriesModal";

const meta = {
  title: "components/task-categories/DeleteTaskCategoriesModal",
  component: DeleteTaskCategoriesModal,
  decorators: [withToastRegion, withThemedBackground],
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button label="Delete task categories" onClick={() => setOpen(true)} />
        <DeleteTaskCategoriesModal
          {...args}
          isOpen={open}
          onOpenChange={setOpen}
        />
      </>
    );
  },
} satisfies Meta<typeof DeleteTaskCategoriesModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskCategoryIds: [1, 2, 3],
    isOpen: false,
    onOpenChange: () => {},
    deleteTaskCategories: () => ({ status: "success" }),
  },
} satisfies Story;

export const WithError = {
  args: {
    taskCategoryIds: [1, 2, 3],
    isOpen: false,
    onOpenChange: () => {},
    deleteTaskCategories: () => ({
      status: "error",
      errorCode: "validationError",
    }),
  },
} satisfies Story;
