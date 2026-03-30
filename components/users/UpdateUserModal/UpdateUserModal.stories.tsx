import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { mockedUserDetail } from "@/mocks/users";
import { UpdateUserForm } from "../UpdateUserForm";
import { UpdateUserModal } from "../UpdateUserModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateUserFormSkeleton } from "../UpdateUserForm";
import { mockedPositionSummaries } from "@/mocks/positions";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateUserProvider } from "../UpdateUserProvider/__stories__";

const meta = {
  title: "components/users/UpdateUserModal",
  component: UpdateUserModal,
  decorators: [
    withOpenModal,
    withUpdateUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateUser",
  },
} satisfies Meta<typeof UpdateUserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateUserFormContainer: (
      <UpdateUserForm
        {...mockedUserDetail}
        userId={mockedUserDetail.id}
        positionSelectItems={mockedPositionSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    updateUserFormContainer: <UpdateUserFormSkeleton />,
  },
} satisfies Story;
