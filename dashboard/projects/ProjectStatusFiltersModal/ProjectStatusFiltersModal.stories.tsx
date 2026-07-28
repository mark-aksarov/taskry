import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFiltersProvider } from "../ProjectFiltersContext";
import { SelectedProjectsProvider } from "../SelectedProjectsContext";
import { ProjectStatusFiltersForm } from "../ProjectStatusFiltersForm";
import { ProjectStatusFiltersModal } from "./ProjectStatusFiltersModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/projects/ProjectStatusFiltersModal",
  component: ProjectStatusFiltersModal,
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
    modalId: "projectStatusFilters",
  },
} satisfies Meta<typeof ProjectStatusFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: <ProjectStatusFiltersForm />,
  },
} satisfies Story;
