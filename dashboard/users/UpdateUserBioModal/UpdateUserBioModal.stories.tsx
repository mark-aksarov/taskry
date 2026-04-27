import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { mockedUserDetail } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateUserBioModal } from "../UpdateUserBioModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateUserBioProvider } from "../UpdateUserBioProvider/__stories__";

const meta = {
  title: "dashboard/users/UpdateUserBioModal",
  component: UpdateUserBioModal,
  decorators: [
    withOpenModal,
    withUpdateUserBioProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateUserBio",
  },
} satisfies Meta<typeof UpdateUserBioModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: mockedUserDetail.id,
    userBio: mockedUserDetail.bio,
  },
} satisfies Story;
