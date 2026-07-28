import { mockedClientDetail } from "@/mocks/clients";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateClientPublicLinkModal } from "./UpdateClientPublicLinkModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { UpdateClientPublicLinkProvider } from "../UpdateClientPublicLinkContext";

const meta = {
  title: "dashboard/clients/UpdateClientPublicLinkModal",
  component: UpdateClientPublicLinkModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateClientPublicLinkProvider>
        <Story />
      </UpdateClientPublicLinkProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "updateClientPublicLink",
  },
} satisfies Meta<typeof UpdateClientPublicLinkModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    clientId: mockedClientDetail.id,
    clientPublicLink: mockedClientDetail.publicLink,
  },
} satisfies Story;
