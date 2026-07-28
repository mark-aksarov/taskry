import { mockedUserDetail } from "@/mocks/users";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateUserAddressModal } from "../UpdateUserAddressModal";
import { UpdateUserAddressProvider } from "../UpdateUserAddressContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/UpdateUserAddressModal",
  component: UpdateUserAddressModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateUserAddressProvider>
        <Story />
      </UpdateUserAddressProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateUserAddress",
  },
} satisfies Meta<typeof UpdateUserAddressModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: mockedUserDetail.id,
    userAddress: mockedUserDetail.address,
  },
} satisfies Story;
