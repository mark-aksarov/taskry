import {
  TaskCategoryFiltersForm,
  TaskCategoryFiltersFormSkeleton,
} from "../TaskCategoryFiltersForm";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskFiltersProvider } from "../TaskFiltersContext";
import { SelectedTasksProvider } from "../SelectedTasksContext";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { TaskCategoryFiltersModal } from "./TaskCategoryFiltersModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/TaskCategoryFiltersModal",
  component: TaskCategoryFiltersModal,
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
    modalId: "taskCategoryFilters",
  },
} satisfies Meta<typeof TaskCategoryFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <TaskCategoryFiltersForm
        categoryCheckboxGroupItems={mockedTaskCategorySummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <TaskCategoryFiltersFormSkeleton />,
  },
} satisfies Story;
