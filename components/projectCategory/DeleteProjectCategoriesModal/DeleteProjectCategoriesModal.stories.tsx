import React from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { DeleteProjectCategoriesModal } from "./DeleteProjectCategoriesModal";
import { withDeleteProjectCategoriesProvider } from "../DeleteProjectCategoriesContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/project-categories/DeleteProjectCategoriesModal",
  component: DeleteProjectCategoriesModal,
  decorators: [
    withDeleteProjectCategoriesProvider,
    withSelectedItemsProvider,
    withToastRegion,
    withThemedBackground,
  ],
  render: (args) => {
    const [open, setOpen] = React.useState(true);

    return (
      <>
        <Button
          label="Delete project categories"
          onClick={() => setOpen(true)}
        />
        <DeleteProjectCategoriesModal
          {...args}
          isOpen={open}
          onOpenChange={setOpen}
        />
      </>
    );
  },
} satisfies Meta<typeof DeleteProjectCategoriesModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isOpen: false,
    onOpenChange: () => {},
  },
} satisfies Story;
