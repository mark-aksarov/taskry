import {
  ProjectCreatorFiltersForm,
  ProjectCreatorFiltersFormSkeleton,
} from "../ProjectCreatorFiltersForm";

import { mockedUserSummaries } from "@/mocks/users";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFiltersProvider } from "../ProjectFiltersContext";
import { SelectedProjectsProvider } from "../SelectedProjectsContext";
import { ProjectCreatorFiltersModal } from "../ProjectCreatorFiltersModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/projects/ProjectCreatorFiltersModal",
  component: ProjectCreatorFiltersModal,
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
    modalId: "projectCreatorFilters",
  },
} satisfies Meta<typeof ProjectCreatorFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <ProjectCreatorFiltersForm
        creatorCheckboxGroupItems={mockedUserSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <ProjectCreatorFiltersFormSkeleton />,
  },
} satisfies Story;
