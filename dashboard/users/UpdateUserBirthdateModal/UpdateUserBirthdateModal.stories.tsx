import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { mockedUserDetail } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateUserBirthdateModal } from "../UpdateUserBirthdateModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateUserBirthdateProvider } from "../UpdateUserBirthdateProvider/__stories__";

const meta = {
  title: "dashboard/users/UpdateUserBirthdateModal",
  component: UpdateUserBirthdateModal,
  decorators: [
    withOpenModal,
    withUpdateUserBirthdateProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateUserBirthdate",
  },
} satisfies Meta<typeof UpdateUserBirthdateModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: mockedUserDetail.id,
    userBirthdate: mockedUserDetail.birthdate,
  },
} satisfies Story;
