import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { mockedUserDetail } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateUserFullNameModal } from "../UpdateUserFullNameModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateUserFullNameProvider } from "../UpdateUserFullNameProvider/__stories__";

const meta = {
  title: "dashboard/users/UpdateUserFullNameModal",
  component: UpdateUserFullNameModal,
  decorators: [
    withOpenModal,
    withUpdateUserFullNameProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateUserFullName",
  },
} satisfies Meta<typeof UpdateUserFullNameModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: mockedUserDetail.id,
    userFullName: mockedUserDetail.fullName,
  },
} satisfies Story;
