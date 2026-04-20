import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { UpdateCustomerFullNameModal } from "./UpdateCustomerFullNameModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateCustomerFullNameProvider } from "../UpdateCustomerFullNameProvider/__stories__";

const meta = {
  title: "dashboard/customers/UpdateCustomerFullNameModal",
  component: UpdateCustomerFullNameModal,
  decorators: [
    withOpenModal,
    withUpdateCustomerFullNameProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateCustomerFullName",
  },
} satisfies Meta<typeof UpdateCustomerFullNameModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customerId: mockedCustomerDetail.id,
    customerFullName: mockedCustomerDetail.fullName,
  },
} satisfies Story;
