import {
  ProjectCreatorFiltersForm,
  ProjectCreatorFiltersFormSkeleton,
} from "../ProjectCreatorFiltersForm";

import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

import { mockedUserSummaries } from "@/mocks/users";
import { ProjectCreatorFiltersModal } from "../ProjectCreatorFiltersModal";
import { withProjectFiltersProvider } from "../ProjectFiltersContext/__stories__";
import { withSelectedProjectsProvider } from "../SelectedProjectsContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/projects/ProjectCreatorFiltersModal",
  component: ProjectCreatorFiltersModal,
  decorators: [
    withOpenModal,
    withProjectFiltersProvider,
    withSelectedProjectsProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "projectCreatorFilters",
  },
} satisfies Meta<typeof ProjectCreatorFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <ProjectCreatorFiltersForm
        creatorCheckboxGroupItems={mockedUserSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <ProjectCreatorFiltersFormSkeleton />,
  },
} satisfies Story;
