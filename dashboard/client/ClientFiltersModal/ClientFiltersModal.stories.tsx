import {
  ClientFiltersForm,
  ClientFiltersFormSkeleton,
} from "../ClientFiltersForm";

import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCompanySummaries } from "@/mocks/companies";
import { ClientFiltersModal } from "./ClientFiltersModal";
import { ClientFiltersProvider } from "../ClientFiltersContext";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/clients/ClientFiltersModal",
  component: ClientFiltersModal,
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
    modalId: "clientFilters",
  },
} satisfies Meta<typeof ClientFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <ClientFiltersForm companyCheckboxGroupItems={mockedCompanySummaries} />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <ClientFiltersFormSkeleton />,
  },
} satisfies Story;
