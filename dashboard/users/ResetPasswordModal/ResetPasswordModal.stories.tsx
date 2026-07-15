import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ResetPasswordModal } from "../ResetPasswordModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withResetPasswordProvider } from "../ResetPasswordProvider/__stories__";

const meta = {
  title: "dashboard/users/ResetPasswordModal",
  component: ResetPasswordModal,
  decorators: [
    withOpenModal,
    withResetPasswordProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "resetPassword",
  },
} satisfies Meta<typeof ResetPasswordModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "user-1",
  },
} satisfies Story;
