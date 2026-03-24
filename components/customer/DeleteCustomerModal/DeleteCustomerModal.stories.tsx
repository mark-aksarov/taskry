import React from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteCustomerModal } from "../DeleteCustomerModal";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteCustomerProvider } from "../DeleteCustomerProvider/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/customers/DeleteCustomerModal",
  component: DeleteCustomerModal,
  decorators: [
    withToastRegion,
    withDeleteCustomerProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
  render: (args) => {
    const [open, setOpen] = React.useState(true);

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
  },
} satisfies Story;
