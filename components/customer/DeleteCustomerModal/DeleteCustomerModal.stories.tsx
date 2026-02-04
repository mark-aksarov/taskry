import React from "react";
import { Button } from "@/components/ui/Button";
import { ToastRegion } from "@/components/ui/Toast";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteCustomerModal } from "./DeleteCustomerModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/customers/DeleteCustomerModal",
  component: DeleteCustomerModal,
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
        <DeleteCustomerModal {...args} isOpen={open} onOpenChange={setOpen} />
      </>
    );
  },
} satisfies Meta<typeof DeleteCustomerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customerId: 1,
    customerFullName: "John Doe",
    isOpen: false,
    onOpenChange: () => {},
    deleteAction: () => ({ status: "success" }),
  },
} satisfies Story;

export const WithError = {
  args: {
    customerId: 1,
    customerFullName: "John Doe",
    isOpen: false,
    onOpenChange: () => {},
    deleteAction: () => ({ status: "error", errorCode: "validationError" }),
  },
} satisfies Story;
