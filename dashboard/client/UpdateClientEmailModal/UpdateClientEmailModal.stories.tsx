import { mockedClientDetail } from "@/mocks/clients";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateClientEmailModal } from "./UpdateClientEmailModal";
import { UpdateClientEmailProvider } from "../UpdateClientEmailContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/clients/UpdateClientEmailModal",
  component: UpdateClientEmailModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateClientEmailProvider>
        <Story />
      </UpdateClientEmailProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "updateClientEmail",
  },
} satisfies Meta<typeof UpdateClientEmailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    clientId: mockedClientDetail.id,
    clientEmail: mockedClientDetail.email,
  },
} satisfies Story;
