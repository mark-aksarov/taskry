import {
  DeleteCustomerImageModal,
  useDeleteCustomerImageModal,
} from "../DeleteCustomerImageModal";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { withDeleteCustomerImageModalProvider } from "./__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/customers/DeleteCustomerImageModal",
  component: DeleteCustomerImageModal,
  decorators: [withDeleteCustomerImageModalProvider, withThemedBackground],
  render: (args) => {
    const { onOpenChange } = useDeleteCustomerImageModal();

    useEffect(() => onOpenChange(true), [onOpenChange]);

    return (
      <>
        <Button label="Open modal" onClick={() => onOpenChange(true)} />
        <DeleteCustomerImageModal {...args} />
      </>
    );
  },
} satisfies Meta<typeof DeleteCustomerImageModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customerId: 1,
    customerFullName: "Customer 1",
  },
} satisfies Story;
