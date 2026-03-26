import React from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { DeleteTaskCategoriesModal } from "./DeleteTaskCategoriesModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteTaskCategoriesProvider } from "../DeleteTaskCategoriesProvider/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/task-categories/DeleteTaskCategoriesModal",
  component: DeleteTaskCategoriesModal,
  decorators: [
    withDeleteTaskCategoriesProvider,
    withSelectedItemsProvider,
    withToastRegion,
    withThemedBackground,
  ],
  render: (args) => {
    const [open, setOpen] = React.useState(true);

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
    isOpen: false,
    onOpenChange: () => {},
  },
} satisfies Story;
