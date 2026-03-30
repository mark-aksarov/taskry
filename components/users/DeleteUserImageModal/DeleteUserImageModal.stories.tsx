import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/react";
import { DeleteUserImageModal } from "./DeleteUserImageModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withClearUserImageUrlProvider } from "../ClearUserImageUrlProvider/__stories__";

const meta = {
  title: "components/users/DeleteUserImageModal",
  component: DeleteUserImageModal,
  decorators: [
    withOpenModal,
    withClearUserImageUrlProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "deleteUserImage",
  },
} satisfies Meta<typeof DeleteUserImageModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "user-1",
    userFullName: "User 1",
  },
} satisfies Story;
