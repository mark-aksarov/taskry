import React from "react";
import { Button } from "@/components/ui/Button";
import { ToastRegion } from "@/components/ui/Toast";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteCustomersModal } from "./DeleteCustomersModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/customers/DeleteCustomersModal",
  component: DeleteCustomersModal,
  decorators: [
    (Story) => (
      <>
        <ToastRegion />
        <Story />
      </>
    ),
    withThemedBackground,
  ],
  render: (args) => {
    const [open, setOpen] = React.useState(false);

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
    customerIds: [1, 2, 3],
    isOpen: false,
    onOpenChange: () => {},
    deleteAction: () => ({ status: "success" }),
  },
} satisfies Story;

export const WithError = {
  args: {
    customerIds: [1, 2, 3],
    isOpen: false,
    onOpenChange: () => {},
    deleteAction: () => ({ status: "error", errorCode: "validationError" }),
  },
} satisfies Story;
