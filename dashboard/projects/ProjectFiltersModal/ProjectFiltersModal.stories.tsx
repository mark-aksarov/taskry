import {
  ProjectFiltersForm,
  ProjectFiltersFormSkeleton,
} from "../ProjectFiltersForm";

import { mockedUserSummaries } from "@/mocks/users";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedClientSummaries } from "@/mocks/clients";
import { ProjectFiltersModal } from "../ProjectFiltersModal";
import { ProjectFiltersProvider } from "../ProjectFiltersContext";
import { SelectedProjectsProvider } from "../SelectedProjectsContext";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/projects/ProjectFiltersModal",
  component: ProjectFiltersModal,
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
    modalId: "projectFilters",
  },
} satisfies Meta<typeof ProjectFiltersModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <ProjectFiltersForm
        categoryCheckboxGroupItems={mockedProjectCategorySummaries}
        userCheckboxGroupItems={mockedUserSummaries}
        clientCheckboxGroupItems={mockedClientSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <ProjectFiltersFormSkeleton />,
  },
} satisfies Story;
