import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { mockedUserDetail } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateUserBioModal } from "../UpdateUserBioModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateUserProvider } from "../UpdateUserProvider/__stories__";

const meta = {
  title: "components/users/UpdateUserBioModal",
  component: UpdateUserBioModal,
  decorators: [
    withOpenModal,
    withUpdateUserProvider,
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
