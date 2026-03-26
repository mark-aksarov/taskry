import {
  DeleteCustomerModal,
  useDeleteCustomerModal,
} from "../../DeleteCustomerModal";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withToastRegion } from "@/.storybook/withToastRegion";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteCustomerModalProvider } from "./withDeleteCustomerModalProvider";
import { withDeleteCustomerProvider } from "../../DeleteCustomerProvider/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";

const meta = {
  title: "components/customers/DeleteCustomerModal",
  component: DeleteCustomerModal,
  decorators: [
    withDeleteCustomerModalProvider,
    withToastRegion,
    withDeleteCustomerProvider,
    withSelectedItemsProvider,
    withThemedBackground,
  ],
  render: (args) => {
    const { onOpenChange } = useDeleteCustomerModal();

    useEffect(() => onOpenChange(true), [onOpenChange]);

    return (
      <>
        <Button label="Open modal" onClick={() => onOpenChange(true)} />
        <DeleteCustomerModal {...args} />
      </>
    );
  },
} satisfies Meta<typeof DeleteCustomerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customerId: 1,
    customerFullName: "Customer 1",
  },
} satisfies Story;
