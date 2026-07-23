import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedClientDetail } from "@/mocks/clients";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UpdateClientPhoneNumberModal } from "./UpdateClientPhoneNumberModal";
import { withUpdateClientPhoneNumberProvider } from "../UpdateClientPhoneNumberProvider/__stories__";

const meta = {
  title: "dashboard/clients/UpdateClientPhoneNumberModal",
  component: UpdateClientPhoneNumberModal,
  decorators: [
    withOpenModal,
    withUpdateClientPhoneNumberProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateClientPhoneNumber",
  },
} satisfies Meta<typeof UpdateClientPhoneNumberModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    clientId: mockedClientDetail.id,
    clientPhoneNumber: mockedClientDetail.phoneNumber,
  },
} satisfies Story;
