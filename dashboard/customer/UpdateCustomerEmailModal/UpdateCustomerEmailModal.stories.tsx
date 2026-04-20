import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { UpdateCustomerEmailModal } from "./UpdateCustomerEmailModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateCustomerEmailProvider } from "../UpdateCustomerEmailProvider/__stories__";

const meta = {
  title: "components/customers/UpdateCustomerEmailModal",
  component: UpdateCustomerEmailModal,
  decorators: [
    withOpenModal,
    withUpdateCustomerEmailProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateCustomerEmail",
  },
} satisfies Meta<typeof UpdateCustomerEmailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customerId: mockedCustomerDetail.id,
    customerEmail: mockedCustomerDetail.email,
  },
} satisfies Story;
