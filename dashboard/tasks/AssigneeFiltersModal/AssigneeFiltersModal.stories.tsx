import {
  AssigneeFiltersForm,
  AssigneeFiltersFormSkeleton,
} from "../AssigneeFiltersForm";

import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { mockedUserSummaries } from "@/mocks/users";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AssigneeFiltersModal } from "./AssigneeFiltersModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withTaskFiltersProvider } from "../TaskFiltersContext/__stories__";
import { withSelectedTasksProvider } from "../SelectedTasksContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/tasks/AssigneeFiltersModal",
  component: AssigneeFiltersModal,
  decorators: [
    withOpenModal,
    withTaskFiltersProvider,
    withSelectedTasksProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
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
