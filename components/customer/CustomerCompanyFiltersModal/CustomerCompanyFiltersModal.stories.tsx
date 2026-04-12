import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCompanySummaries } from "@/mocks/companies";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerCompanyFiltersModal } from "./CustomerCompanyFiltersModal";
import {
  CustomerCompanyFiltersForm,
  CustomerCompanyFiltersFormSkeleton,
} from "../CustomerCompanyFiltersForm";
import { withCustomerFiltersProvider } from "../CustomerFiltersContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/customers/CustomerCompanyFiltersModal",
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
