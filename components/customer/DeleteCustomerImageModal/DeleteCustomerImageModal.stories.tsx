import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { useDeleteCustomerImage } from "../DeleteCustomerImageContext";
import { DeleteCustomerImageModal } from "../DeleteCustomerImageModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteCustomerImageProvider } from "../DeleteCustomerImageContext/__stories__";

const meta = {
  title: "components/customers/DeleteCustomerImageModal",
  component: DeleteCustomerImageModal,
  decorators: [withDeleteCustomerImageProvider, withThemedBackground],
  render: (args) => {
    const { onModalOpenChange } = useDeleteCustomerImage();

    useEffect(() => onModalOpenChange(true), [onModalOpenChange]);

    return (
      <>
        <Button
          label="Delete customer image"
          onClick={() => onModalOpenChange(true)}
        />
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
