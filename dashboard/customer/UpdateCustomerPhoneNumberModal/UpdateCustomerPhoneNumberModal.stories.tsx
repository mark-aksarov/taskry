import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UpdateCustomerPhoneNumberModal } from "./UpdateCustomerPhoneNumberModal";
import { withUpdateCustomerPhoneNumberProvider } from "../UpdateCustomerPhoneNumberProvider/__stories__";

const meta = {
  title: "components/customers/UpdateCustomerPhoneNumberModal",
  component: UpdateCustomerPhoneNumberModal,
  decorators: [
    withOpenModal,
    withUpdateCustomerPhoneNumberProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateCustomerPhoneNumber",
  },
} satisfies Meta<typeof UpdateCustomerPhoneNumberModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customerId: mockedCustomerDetail.id,
    customerPhoneNumber: mockedCustomerDetail.phoneNumber,
  },
} satisfies Story;
