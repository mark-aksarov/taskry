import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { mockedUserDetail } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UpdateUserPhoneNumberModal } from "../UpdateUserPhoneNumberModal";
import { withUpdateUserPhoneNumberProvider } from "../UpdateUserPhoneNumberProvider/__stories__";

const meta = {
  title: "components/users/UpdateUserPhoneNumberModal",
  component: UpdateUserPhoneNumberModal,
  decorators: [
    withOpenModal,
    withUpdateUserPhoneNumberProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateUserPhoneNumber",
  },
} satisfies Meta<typeof UpdateUserPhoneNumberModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: mockedUserDetail.id,
    userPhoneNumber: mockedUserDetail.phoneNumber,
  },
} satisfies Story;
