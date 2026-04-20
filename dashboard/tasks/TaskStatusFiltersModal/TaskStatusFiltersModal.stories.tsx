import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskStatusFiltersForm } from "../TaskStatusFiltersForm";
import { TaskStatusFiltersModal } from "./TaskStatusFiltersModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskFiltersProvider } from "../TaskFiltersContext/__stories__";
import { withSelectedTasksProvider } from "../SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/tasks/TaskStatusFiltersModal",
  component: TaskStatusFiltersModal,
  decorators: [
    withOpenModal,
    withTaskFiltersProvider,
    withSelectedTasksProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
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
