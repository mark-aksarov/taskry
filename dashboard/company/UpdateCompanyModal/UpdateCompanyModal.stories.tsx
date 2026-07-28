import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateCompanyModal } from "../UpdateCompanyModal";
import { UpdateCompanyProvider } from "../UpdateCompanyContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/companies/UpdateCompanyModal",
  component: UpdateCompanyModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateCompanyProvider>
        <Story />
      </UpdateCompanyProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "updateCompany",
  },
} satisfies Meta<typeof UpdateCompanyModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    companyId: 1,
    companyName: "Company 1",
  },
} satisfies Story;
