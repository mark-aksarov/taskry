import { mockedUserDetail } from "@/mocks/users";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateUserBioModal } from "../UpdateUserBioModal";
import { UpdateUserBioProvider } from "../UpdateUserBioContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/UpdateUserBioModal",
  component: UpdateUserBioModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateUserBioProvider>
        <Story />
      </UpdateUserBioProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateUserBio",
  },
} satisfies Meta<typeof UpdateUserBioModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: mockedUserDetail.id,
    userBio: mockedUserDetail.bio,
  },
} satisfies Story;
