import {
  CustomerFiltersForm,
  CustomerFiltersFormSkeleton,
} from "../CustomerFiltersForm";

import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCompanySummaries } from "@/mocks/companies";
import { CustomerFiltersModal } from "./CustomerFiltersModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCustomerFiltersProvider } from "../CustomerFiltersContext/__stories__";
import { withSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/customers/CustomerFiltersModal",
  component: CustomerFiltersModal,
  decorators: [
    withOpenModal,
    withCustomerFiltersProvider,
    withSelectedItemsProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "customerFilters",
  },
} satisfies Meta<typeof CustomerFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <CustomerFiltersForm companyCheckboxGroupItems={mockedCompanySummaries} />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <CustomerFiltersFormSkeleton />,
  },
} satisfies Story;
