import { mockedUserDetail } from "@/mocks/users";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateUserBirthdateModal } from "../UpdateUserBirthdateModal";
import { UpdateUserBirthdateProvider } from "../UpdateUserBirthdateContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/UpdateUserBirthdateModal",
  component: UpdateUserBirthdateModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateUserBirthdateProvider>
        <Story />
      </UpdateUserBirthdateProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateUserBirthdate",
  },
} satisfies Meta<typeof UpdateUserBirthdateModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: mockedUserDetail.id,
    userBirthdate: mockedUserDetail.birthdate,
  },
} satisfies Story;
