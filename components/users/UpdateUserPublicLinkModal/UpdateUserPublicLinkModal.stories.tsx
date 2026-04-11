import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { mockedUserDetail } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateUserPublicLinkModal } from "../UpdateUserPublicLinkModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateUserPublicLinkProvider } from "../UpdateUserPublicLinkProvider/__stories__";

const meta = {
  title: "components/users/UpdateUserPublicLinkModal",
  component: UpdateUserPublicLinkModal,
  decorators: [
    withOpenModal,
    withUpdateUserPublicLinkProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateUserPublicLink",
  },
} satisfies Meta<typeof UpdateUserPublicLinkModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: mockedUserDetail.id,
    userPublicLink: mockedUserDetail.publicLink,
  },
} satisfies Story;
