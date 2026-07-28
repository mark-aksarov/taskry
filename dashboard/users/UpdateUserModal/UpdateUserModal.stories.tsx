import { mockedUserDetail } from "@/mocks/users";
import { UpdateUserForm } from "../UpdateUserForm";
import { UpdateUserModal } from "../UpdateUserModal";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateUserProvider } from "../UpdateUserProvider";
import { UpdateUserFormSkeleton } from "../UpdateUserForm";
import { mockedPositionSummaries } from "@/mocks/positions";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/UpdateUserModal",
  component: UpdateUserModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateUserProvider>
        <Story />
      </UpdateUserProvider>
    ),
    withDashboardLayoutProviders,
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
