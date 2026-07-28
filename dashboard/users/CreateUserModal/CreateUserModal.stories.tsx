import { CreateUserModal } from "../CreateUserModal";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateUserProvider } from "../CreateUserContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/CreateUserModal",
  component: CreateUserModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <CreateUserProvider>
        <Story />
      </CreateUserProvider>
    ),
    withDashboardLayoutProviders,
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
