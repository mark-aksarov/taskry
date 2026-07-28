import {
  TaskProjectFiltersForm,
  TaskProjectFiltersFormSkeleton,
} from "../TaskProjectFiltersForm";

import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectSummaries } from "@/mocks/projects";
import { TaskFiltersProvider } from "../TaskFiltersContext";
import { SelectedTasksProvider } from "../SelectedTasksContext";
import { TaskProjectFiltersModal } from "./TaskProjectFiltersModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/TaskProjectFiltersModal",
  component: TaskProjectFiltersModal,
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
    modalId: "taskProjectFilters",
  },
} satisfies Meta<typeof TaskProjectFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <TaskProjectFiltersForm
        projectCheckboxGroupItems={mockedProjectSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <TaskProjectFiltersFormSkeleton />,
  },
} satisfies Story;
