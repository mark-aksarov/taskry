import React from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteCustomersModal } from "./DeleteCustomersModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withToastRegion } from "@/.storybook/withToastRegion";

const meta = {
  title: "components/customers/DeleteCustomersModal",
  component: DeleteCustomersModal,
  decorators: [withToastRegion, withThemedBackground],
  render: (args) => {
    const [open, setOpen] = React.useState(true);

    return (
      <>
        <Button label="Delete customer" onClick={() => setOpen(true)} />
        <DeleteCustomersModal {...args} isOpen={open} onOpenChange={setOpen} />
      </>
    );
  },
} satisfies Meta<typeof DeleteCustomersModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isOpen: false,
    onOpenChange: () => {},
  },
} satisfies Story;
