import {
  ProjectClientFiltersForm,
  ProjectClientFiltersFormSkeleton,
} from "../ProjectClientFiltersForm";

import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedClientSummaries } from "@/mocks/clients";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectClientFiltersModal } from "../ProjectClientFiltersModal";
import { withProjectFiltersProvider } from "../ProjectFiltersContext/__stories__";
import { withSelectedProjectsProvider } from "../SelectedProjectsContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "dashboard/projects/ProjectClientFiltersModal",
  component: ProjectClientFiltersModal,
  decorators: [
    withOpenModal,
    withProjectFiltersProvider,
    withSelectedProjectsProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "projectClientFilters",
  },
} satisfies Meta<typeof ProjectClientFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <ProjectClientFiltersForm
        clientCheckboxGroupItems={mockedClientSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <ProjectClientFiltersFormSkeleton />,
  },
} satisfies Story;
