import { CompanyGrid } from "../CompanyGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompanyGridExample } from "./CompanyGridExample";
import { DeleteCompaniesProvider } from "../../DeleteCompaniesContext";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/companies/CompanyGrid",
  component: CompanyGrid,
  decorators: [
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <DeleteCompaniesProvider>
          <Story />
        </DeleteCompaniesProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
  ],
} satisfies Meta<typeof CompanyGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: <CompanyGridExample />,
  },
} satisfies Story;
