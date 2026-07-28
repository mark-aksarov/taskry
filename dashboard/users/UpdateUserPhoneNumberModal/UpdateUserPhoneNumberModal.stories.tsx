import { mockedUserDetail } from "@/mocks/users";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateUserPhoneNumberModal } from "../UpdateUserPhoneNumberModal";
import { UpdateUserPhoneNumberProvider } from "../UpdateUserPhoneNumberContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/UpdateUserPhoneNumberModal",
  component: UpdateUserPhoneNumberModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateUserPhoneNumberProvider>
        <Story />
      </UpdateUserPhoneNumberProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateUserPhoneNumber",
  },
} satisfies Meta<typeof UpdateUserPhoneNumberModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: mockedUserDetail.id,
    userPhoneNumber: mockedUserDetail.phoneNumber,
  },
} satisfies Story;
