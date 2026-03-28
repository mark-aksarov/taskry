import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/react";
import { DeleteCustomerImageModal } from "./DeleteCustomerImageModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withClearCustomerImageUrlProvider } from "../ClearCustomerImageUrlProvider/__stories__";

const meta = {
  title: "components/customers/DeleteCustomerImageModal",
  component: DeleteCustomerImageModal,
  decorators: [
    withOpenModal,
    withClearCustomerImageUrlProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "deleteCustomerImage",
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
