import { mockedUserSummaries } from "@/mocks/users";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { TaskFiltersModal } from "./TaskFiltersModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectSummaries } from "@/mocks/projects";
import { TaskFiltersProvider } from "../TaskFiltersContext";
import { SelectedTasksProvider } from "../SelectedTasksContext";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { TaskFiltersForm, TaskFiltersFormSkeleton } from "../TaskFiltersForm";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/TaskFiltersModal",
  component: TaskFiltersModal,
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
    modalId: "taskFilters",
  },
} satisfies Meta<typeof TaskFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <TaskFiltersForm
        categoryCheckboxGroupItems={mockedTaskCategorySummaries}
        projectCheckboxGroupItems={mockedProjectSummaries}
        assigneeCheckboxGroupItems={mockedUserSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <TaskFiltersFormSkeleton />,
  },
} satisfies Story;
