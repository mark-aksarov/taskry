import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChangePasswordModal } from "../ChangePasswordModal";
import { ChangePasswordProvider } from "../ChangePasswordContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/ChangePasswordModal",
  component: ChangePasswordModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <ChangePasswordProvider>
        <Story />
      </ChangePasswordProvider>
    ),
    withDashboardLayoutProviders,
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
