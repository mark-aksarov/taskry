import { withOpenModal } from "@/.storybook/withOpenModal";
import { CreateClientForm } from "../CreateClientForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateClientModal } from "./CreateClientModal";
import { mockedCompanySummaries } from "@/mocks/companies";
import { ClientFormSkeleton } from "../ClientFormSkeleton";
import { CreateClientProvider } from "../CreateClientContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/clients/CreateClientModal",
  component: CreateClientModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <CreateClientProvider>
        <Story />
      </CreateClientProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "createClient",
  },
} satisfies Meta<typeof CreateClientModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createClientFormContainer: (
      <CreateClientForm companySelectItems={mockedCompanySummaries} />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    createClientFormContainer: <ClientFormSkeleton />,
  },
} satisfies Story;
