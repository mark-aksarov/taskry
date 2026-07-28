import {
  ProjectClientFiltersForm,
  ProjectClientFiltersFormSkeleton,
} from "../ProjectClientFiltersForm";

import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedClientSummaries } from "@/mocks/clients";
import { ProjectFiltersProvider } from "../ProjectFiltersContext";
import { SelectedProjectsProvider } from "../SelectedProjectsContext";
import { ProjectClientFiltersModal } from "../ProjectClientFiltersModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/projects/ProjectClientFiltersModal",
  component: ProjectClientFiltersModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <SelectedProjectsProvider pageItems={[]}>
        <ProjectFiltersProvider filters={{}}>
          <Story />
        </ProjectFiltersProvider>
      </SelectedProjectsProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "projectClientFilters",
  },
} satisfies Meta<typeof ProjectClientFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <ProjectClientFiltersForm
        clientCheckboxGroupItems={mockedClientSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <ProjectClientFiltersFormSkeleton />,
  },
} satisfies Story;
