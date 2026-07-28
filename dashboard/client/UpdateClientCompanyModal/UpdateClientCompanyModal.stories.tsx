import {
  UpdateClientCompanyForm,
  UpdateClientCompanyFormSkeleton,
} from "../UpdateClientCompanyForm";

import { mockedClientDetail } from "@/mocks/clients";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCompanySummaries } from "@/mocks/companies";
import { UpdateClientCompanyModal } from "./UpdateClientCompanyModal";
import { UpdateClientCompanyProvider } from "../UpdateClientCompanyContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/clients/UpdateClientCompanyModal",
  component: UpdateClientCompanyModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateClientCompanyProvider>
        <Story />
      </UpdateClientCompanyProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "updateClientCompany",
  },
} satisfies Meta<typeof UpdateClientCompanyModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateClientCompanyFormContainer: (
      <UpdateClientCompanyForm
        clientId={mockedClientDetail.id}
        companyId={mockedClientDetail.company.id}
        companySelectItems={mockedCompanySummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    updateClientCompanyFormContainer: <UpdateClientCompanyFormSkeleton />,
  },
} satisfies Story;
