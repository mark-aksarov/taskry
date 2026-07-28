import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskFiltersProvider } from "../TaskFiltersContext";
import { SelectedTasksProvider } from "../SelectedTasksContext";
import { TaskStatusFiltersForm } from "../TaskStatusFiltersForm";
import { TaskStatusFiltersModal } from "./TaskStatusFiltersModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/TaskStatusFiltersModal",
  component: TaskStatusFiltersModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <SelectedTasksProvider pageItems={[]}>
        <TaskFiltersProvider filters={{}}>
          <Story />
        </TaskFiltersProvider>
      </SelectedTasksProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "taskStatusFilters",
  },
} satisfies Meta<typeof TaskStatusFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: <TaskStatusFiltersForm />,
  },
} satisfies Story;
