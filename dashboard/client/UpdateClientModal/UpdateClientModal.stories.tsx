import { mockedClientDetail } from "@/mocks/clients";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { UpdateClientForm } from "../UpdateClientForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateClientModal } from "./UpdateClientModal";
import { mockedCompanySummaries } from "@/mocks/companies";
import { ClientFormSkeleton } from "../ClientFormSkeleton";
import { UpdateClientProvider } from "../UpdateClientContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/clients/UpdateClientModal",
  component: UpdateClientModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateClientProvider>
        <Story />
      </UpdateClientProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "updateClient",
  },
} satisfies Meta<typeof UpdateClientModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateClientFormContainer: (
      <UpdateClientForm
        {...mockedClientDetail}
        clientId={mockedClientDetail.id}
        companySelectItems={mockedCompanySummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    updateClientFormContainer: <ClientFormSkeleton />,
  },
} satisfies Story;
