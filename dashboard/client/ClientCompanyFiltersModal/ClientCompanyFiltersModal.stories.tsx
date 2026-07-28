import {
  ClientCompanyFiltersForm,
  ClientCompanyFiltersFormSkeleton,
} from "../ClientCompanyFiltersForm";

import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCompanySummaries } from "@/mocks/companies";
import { ClientFiltersProvider } from "../ClientFiltersContext";
import { ClientCompanyFiltersModal } from "./ClientCompanyFiltersModal";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/clients/ClientCompanyFiltersModal",
  component: ClientCompanyFiltersModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <ClientFiltersProvider filters={{}}>
          <Story />
        </ClientFiltersProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "clientCompanyFilters",
  },
} satisfies Meta<typeof ClientCompanyFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <ClientCompanyFiltersForm
        companyCheckboxGroupItems={mockedCompanySummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <ClientCompanyFiltersFormSkeleton />,
  },
} satisfies Story;
