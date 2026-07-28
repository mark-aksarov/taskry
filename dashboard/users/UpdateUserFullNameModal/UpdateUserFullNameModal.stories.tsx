import { mockedUserDetail } from "@/mocks/users";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateUserFullNameModal } from "../UpdateUserFullNameModal";
import { UpdateUserFullNameProvider } from "../UpdateUserFullNameContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/UpdateUserFullNameModal",
  component: UpdateUserFullNameModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateUserFullNameProvider>
        <Story />
      </UpdateUserFullNameProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateUserFullName",
  },
} satisfies Meta<typeof UpdateUserFullNameModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: mockedUserDetail.id,
    userFullName: mockedUserDetail.fullName,
  },
} satisfies Story;
