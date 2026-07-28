import { mockedClientDetail } from "@/mocks/clients";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateClientFullNameModal } from "./UpdateClientFullNameModal";
import { UpdateClientFullNameProvider } from "../UpdateClientFullNameContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/clients/UpdateClientFullNameModal",
  component: UpdateClientFullNameModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateClientFullNameProvider>
        <Story />
      </UpdateClientFullNameProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "updateClientFullName",
  },
} satisfies Meta<typeof UpdateClientFullNameModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    clientId: mockedClientDetail.id,
    clientFullName: mockedClientDetail.fullName,
  },
} satisfies Story;
