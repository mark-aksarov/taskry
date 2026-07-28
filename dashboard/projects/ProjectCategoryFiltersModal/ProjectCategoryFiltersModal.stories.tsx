import {
  ProjectCategoryFiltersForm,
  ProjectCategoryFiltersFormSkeleton,
} from "../ProjectCategoryFiltersForm";

import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFiltersProvider } from "../ProjectFiltersContext";
import { SelectedProjectsProvider } from "../SelectedProjectsContext";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { ProjectCategoryFiltersModal } from "../ProjectCategoryFiltersModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/projects/ProjectCategoryFiltersModal",
  component: ProjectCategoryFiltersModal,
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
    modalId: "projectCategoryFilters",
  },
} satisfies Meta<typeof ProjectCategoryFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <ProjectCategoryFiltersForm
        categoryCheckboxGroupItems={mockedProjectCategorySummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <ProjectCategoryFiltersFormSkeleton />,
  },
} satisfies Story;
