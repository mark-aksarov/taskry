import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteUserImageModal } from "./DeleteUserImageModal";
import { ClearUserImageUrlProvider } from "../ClearUserImageUrlContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/DeleteUserImageModal",
  component: DeleteUserImageModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <ClearUserImageUrlProvider>
        <Story />
      </ClearUserImageUrlProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "deleteUserImage",
  },
} satisfies Meta<typeof DeleteUserImageModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    userId: "user-1",
    userFullName: "User 1",
  },
} satisfies Story;
