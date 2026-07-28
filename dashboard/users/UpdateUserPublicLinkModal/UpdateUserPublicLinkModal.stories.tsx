import { mockedUserDetail } from "@/mocks/users";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateUserPublicLinkModal } from "../UpdateUserPublicLinkModal";
import { UpdateUserPublicLinkProvider } from "../UpdateUserPublicLinkContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/UpdateUserPublicLinkModal",
  component: UpdateUserPublicLinkModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateUserPublicLinkProvider>
        <Story />
      </UpdateUserPublicLinkProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateUserPublicLink",
  },
} satisfies Meta<typeof UpdateUserPublicLinkModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: mockedUserDetail.id,
    userPublicLink: mockedUserDetail.publicLink,
  },
} satisfies Story;
