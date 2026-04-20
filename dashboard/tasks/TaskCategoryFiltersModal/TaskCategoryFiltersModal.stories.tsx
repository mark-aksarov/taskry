import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  TaskCategoryFiltersForm,
  TaskCategoryFiltersFormSkeleton,
} from "../TaskCategoryFiltersForm";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { TaskCategoryFiltersModal } from "./TaskCategoryFiltersModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskFiltersProvider } from "../TaskFiltersContext/__stories__";
import { withSelectedTasksProvider } from "../SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "dashboard/tasks/TaskCategoryFiltersModal",
  component: TaskCategoryFiltersModal,
  decorators: [
    withOpenModal,
    withTaskFiltersProvider,
    withSelectedTasksProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
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
