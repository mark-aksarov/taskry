import {
  ClientFiltersForm,
  ClientFiltersFormSkeleton,
} from "../ClientFiltersForm";

import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCompanySummaries } from "@/mocks/companies";
import { ClientFiltersModal } from "./ClientFiltersModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withClientFiltersProvider } from "../ClientFiltersContext/__stories__";
import { withSelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "dashboard/clients/ClientFiltersModal",
  component: ClientFiltersModal,
  decorators: [
    withOpenModal,
    withClientFiltersProvider,
    withSelectedItemsProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
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
