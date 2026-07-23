import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCompanySummaries } from "@/mocks/companies";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ClientCompanyFiltersModal } from "./ClientCompanyFiltersModal";
import {
  ClientCompanyFiltersForm,
  ClientCompanyFiltersFormSkeleton,
} from "../ClientCompanyFiltersForm";
import { withClientFiltersProvider } from "../ClientFiltersContext/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "dashboard/clients/ClientCompanyFiltersModal",
  component: ClientCompanyFiltersModal,
  decorators: [
    withOpenModal,
    withClientFiltersProvider,
    withSelectedItemsProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
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
