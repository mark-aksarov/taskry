import {
  DeleteCustomerImageModal,
  useDeleteCustomerImageModal,
} from "../../DeleteCustomerImageModal";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteCustomerImageModalProvider } from "./withDeleteCustomerImageModalProvider";
import { withClearCustomerImageUrlProvider } from "../../ClearCustomerImageUrlProvider/__stories__";

const meta = {
  title: "components/customers/DeleteCustomerImageModal",
  component: DeleteCustomerImageModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useDeleteCustomerImageModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withClearCustomerImageUrlProvider,
    withDeleteCustomerImageModalProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof DeleteCustomerImageModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customerId: 1,
    customerFullName: "Customer 1",
  },
} satisfies Story;
