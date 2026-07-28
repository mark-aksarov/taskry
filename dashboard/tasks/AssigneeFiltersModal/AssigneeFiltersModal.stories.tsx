import {
  AssigneeFiltersForm,
  AssigneeFiltersFormSkeleton,
} from "../AssigneeFiltersForm";

import { mockedUserSummaries } from "@/mocks/users";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskFiltersProvider } from "../TaskFiltersContext";
import { AssigneeFiltersModal } from "./AssigneeFiltersModal";
import { SelectedTasksProvider } from "../SelectedTasksContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/AssigneeFiltersModal",
  component: AssigneeFiltersModal,
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
    modalId: "assigneeFilters",
  },
} satisfies Meta<typeof AssigneeFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <AssigneeFiltersForm assigneeCheckboxGroupItems={mockedUserSummaries} />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <AssigneeFiltersFormSkeleton />,
  },
} satisfies Story;
