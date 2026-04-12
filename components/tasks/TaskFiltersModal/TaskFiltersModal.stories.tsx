import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { mockedUserSummaries } from "@/mocks/users";
import { TaskFiltersModal } from "./TaskFiltersModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectSummaries } from "@/mocks/projects";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskFiltersProvider } from "../TaskFiltersContext/__stories__";
import { TaskFiltersForm, TaskFiltersFormSkeleton } from "../TaskFiltersForm";
import { withSelectedTasksProvider } from "../SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/tasks/TaskFiltersModal",
  component: TaskFiltersModal,
  decorators: [
    withOpenModal,
    withTaskFiltersProvider,
    withSelectedTasksProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
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
