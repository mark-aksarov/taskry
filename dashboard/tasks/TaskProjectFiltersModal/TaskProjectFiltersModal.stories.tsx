import {
  TaskProjectFiltersForm,
  TaskProjectFiltersFormSkeleton,
} from "../TaskProjectFiltersForm";

import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectSummaries } from "@/mocks/projects";
import { TaskProjectFiltersModal } from "./TaskProjectFiltersModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskFiltersProvider } from "../TaskFiltersContext/__stories__";
import { withSelectedTasksProvider } from "../SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "dashboard/tasks/TaskProjectFiltersModal",
  component: TaskProjectFiltersModal,
  decorators: [
    withOpenModal,
    withTaskFiltersProvider,
    withSelectedTasksProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
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
