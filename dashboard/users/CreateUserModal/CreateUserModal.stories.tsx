import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { CreateUserModal } from "../CreateUserModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateUserProvider } from "../CreateUserProvider/__stories__";

const meta = {
  title: "dashboard/users/CreateUserModal",
  component: CreateUserModal,
  decorators: [
    withOpenModal,
    withCreateUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "createUser",
  },
} satisfies Meta<typeof CreateUserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
