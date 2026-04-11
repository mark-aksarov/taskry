import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { UpdateCustomerBioModal } from "./UpdateCustomerBioModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateCustomerBioProvider } from "../UpdateCustomerBioProvider/__stories__";

const meta = {
  title: "components/customers/UpdateCustomerBioModal",
  component: UpdateCustomerBioModal,
  decorators: [
    withOpenModal,
    withUpdateCustomerBioProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateCustomerBio",
  },
} satisfies Meta<typeof UpdateCustomerBioModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    customerId: mockedCustomerDetail.id,
    customerBio: mockedCustomerDetail.bio,
  },
} satisfies Story;
