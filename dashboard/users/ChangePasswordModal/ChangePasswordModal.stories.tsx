import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChangePasswordModal } from "../ChangePasswordModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withChangePasswordProvider } from "../ChangePasswordProvider/__stories__";

const meta = {
  title: "components/users/ChangePasswordModal",
  component: ChangePasswordModal,
  decorators: [
    withOpenModal,
    withChangePasswordProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "changePassword",
  },
} satisfies Meta<typeof ChangePasswordModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "user-1",
  },
} satisfies Story;
