import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCompanySummaries } from "@/mocks/companies";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerCompanyFiltersModal } from "./CustomerCompanyFiltersModal";
import {
  CustomerCompanyFiltersForm,
  CustomerCompanyFiltersFormSkeleton,
} from "../CustomerCompanyFiltersForm";
import { withCustomerFiltersProvider } from "../CustomerFiltersContext/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "dashboard/customers/CustomerCompanyFiltersModal",
  component: CustomerCompanyFiltersModal,
  decorators: [
    withOpenModal,
    withCustomerFiltersProvider,
    withSelectedItemsProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "customerCompanyFilters",
  },
} satisfies Meta<typeof CustomerCompanyFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <CustomerCompanyFiltersForm
        companyCheckboxGroupItems={mockedCompanySummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <CustomerCompanyFiltersFormSkeleton />,
  },
} satisfies Story;
