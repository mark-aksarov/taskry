import { mockedClientDetail } from "@/mocks/clients";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateClientPhoneNumberModal } from "./UpdateClientPhoneNumberModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { UpdateClientPhoneNumberProvider } from "../UpdateClientPhoneNumberContext";

const meta = {
  title: "dashboard/clients/UpdateClientPhoneNumberModal",
  component: UpdateClientPhoneNumberModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateClientPhoneNumberProvider>
        <Story />
      </UpdateClientPhoneNumberProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "updateClientPhoneNumber",
  },
} satisfies Meta<typeof UpdateClientPhoneNumberModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    clientId: mockedClientDetail.id,
    clientPhoneNumber: mockedClientDetail.phoneNumber,
  },
} satisfies Story;
