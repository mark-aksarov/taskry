import { DeleteUserModal } from "../DeleteUserModal";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteUserProvider } from "../DeleteUserContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/DeleteUserModal",
  component: DeleteUserModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <DeleteUserProvider>
        <Story />
      </DeleteUserProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "deleteUser",
  },
} satisfies Meta<typeof DeleteUserModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "user-1",
    userFullName: "Fake User",
  },
} satisfies Story;
