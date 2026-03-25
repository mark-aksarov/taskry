import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { DeleteProjectCategoryModal } from "../DeleteProjectCategoryModal";
import { withDeleteProjectCategoryProvider } from "../DeleteProjectCategoryProvider/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/project-categories/DeleteProjectCategoryModal",
  component: DeleteProjectCategoryModal,
  decorators: [
    withDeleteProjectCategoryProvider,
    withSelectedItemsProvider,
    withToastRegion,
    withThemedBackground,
  ],
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <Button label="Delete project category" onClick={() => setOpen(true)} />
        <DeleteProjectCategoryModal
          {...args}
          isOpen={open}
          onOpenChange={setOpen}
        />
      </>
    );
  },
} satisfies Meta<typeof DeleteProjectCategoryModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectCategoryId: 1,
    projectCategoryName: "Project Category 1",
    isOpen: false,
    onOpenChange: () => {},
  },
} satisfies Story;
