import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UpdateCustomerPublicLinkModal } from "./UpdateCustomerPublicLinkModal";
import { withUpdateCustomerPublicLinkProvider } from "../UpdateCustomerPublicLinkProvider/__stories__";

const meta = {
  title: "dashboard/customers/UpdateCustomerPublicLinkModal",
  component: UpdateCustomerPublicLinkModal,
  decorators: [
    withOpenModal,
    withUpdateCustomerPublicLinkProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateCustomerPublicLink",
  },
} satisfies Meta<typeof UpdateCustomerPublicLinkModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customerId: mockedCustomerDetail.id,
    customerPublicLink: mockedCustomerDetail.publicLink,
  },
} satisfies Story;
