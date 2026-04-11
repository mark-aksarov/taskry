import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { mockedUserDetail } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateUserAddressModal } from "../UpdateUserAddressModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateUserAddressProvider } from "../UpdateUserAddressProvider/__stories__";

const meta = {
  title: "components/users/UpdateUserAddressModal",
  component: UpdateUserAddressModal,
  decorators: [
    withOpenModal,
    withUpdateUserAddressProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateUserAddress",
  },
} satisfies Meta<typeof UpdateUserAddressModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: mockedUserDetail.id,
    userAddress: mockedUserDetail.address,
  },
} satisfies Story;
