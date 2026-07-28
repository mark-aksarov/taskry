import { CompanyListItem } from "../CompanyListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateCompanyProvider } from "../../UpdateCompanyContext";
import { DeleteCompanyProvider } from "../../DeleteCompanyContext";
import { DeleteCompaniesProvider } from "../../DeleteCompaniesContext";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/companies/CompanyListItem",
  component: CompanyListItem,
  decorators: [
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <DeleteCompaniesProvider>
          <UpdateCompanyProvider>
            <DeleteCompanyProvider>
              <Story />
            </DeleteCompanyProvider>
          </UpdateCompanyProvider>
        </DeleteCompaniesProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
  ],
} satisfies Meta<typeof CompanyListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    name: "Company 1",
  },
} satisfies Story;
