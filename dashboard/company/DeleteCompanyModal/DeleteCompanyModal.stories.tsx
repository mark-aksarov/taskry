import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteCompanyModal } from "../DeleteCompanyModal";
import { DeleteCompanyProvider } from "../DeleteCompanyContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";

const meta = {
  title: "dashboard/companies/DeleteCompanyModal",
  component: DeleteCompanyModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <DeleteCompanyProvider>
          <Story />
        </DeleteCompanyProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "deleteCompany",
  },
} satisfies Meta<typeof DeleteCompanyModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    companyId: 1,
    companyName: "Company 1",
  },
} satisfies Story;
