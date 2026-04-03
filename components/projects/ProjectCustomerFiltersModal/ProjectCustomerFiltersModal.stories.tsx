import {
  ProjectCustomerFiltersForm,
  ProjectCustomerFiltersFormSkeleton,
} from "../ProjectCustomerFiltersForm";

import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCustomerFiltersModal } from "../ProjectCustomerFiltersModal";
import { withProjectFiltersProvider } from "../ProjectFiltersContext/__stories__";
import { withSelectedProjectsProvider } from "../SelectedProjectsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/projects/ProjectCustomerFiltersModal",
  component: ProjectCustomerFiltersModal,
  decorators: [
    withOpenModal,
    withProjectFiltersProvider,
    withSelectedProjectsProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "projectCustomerFilters",
  },
} satisfies Meta<typeof ProjectCustomerFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <ProjectCustomerFiltersForm
        customerCheckboxGroupItems={mockedCustomerSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <ProjectCustomerFiltersFormSkeleton />,
  },
} satisfies Story;
