import { mockedClientDetail } from "@/mocks/clients";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateClientBioModal } from "./UpdateClientBioModal";
import { UpdateClientBioProvider } from "../UpdateClientBioContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/clients/UpdateClientBioModal",
  component: UpdateClientBioModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateClientBioProvider>
        <Story />
      </UpdateClientBioProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "updateClientBio",
  },
} satisfies Meta<typeof UpdateClientBioModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    clientId: mockedClientDetail.id,
    clientBio: mockedClientDetail.bio,
  },
} satisfies Story;
