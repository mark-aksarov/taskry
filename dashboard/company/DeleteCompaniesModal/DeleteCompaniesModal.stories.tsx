import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteCompaniesModal } from "./DeleteCompaniesModal";
import { DeleteCompaniesProvider } from "../DeleteCompaniesContext";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/companies/DeleteCompaniesModal",
  component: DeleteCompaniesModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <DeleteCompaniesProvider>
          <Story />
        </DeleteCompaniesProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "deleteCompanies",
  },
} satisfies Meta<typeof DeleteCompaniesModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isOpen: false,
    onOpenChange: () => {},
  },
} satisfies Story;
