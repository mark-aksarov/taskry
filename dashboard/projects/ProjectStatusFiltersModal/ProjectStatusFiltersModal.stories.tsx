import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectStatusFiltersForm } from "../ProjectStatusFiltersForm";
import { ProjectStatusFiltersModal } from "./ProjectStatusFiltersModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withProjectFiltersProvider } from "../ProjectFiltersContext/__stories__";
import { withSelectedProjectsProvider } from "../SelectedProjectsContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";

const meta = {
  title: "dashboard/projects/ProjectStatusFiltersModal",
  component: ProjectStatusFiltersModal,
  decorators: [
    withOpenModal,
    withProjectFiltersProvider,
    withSelectedProjectsProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "projectStatusFilters",
  },
} satisfies Meta<typeof ProjectStatusFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: <ProjectStatusFiltersForm />,
  },
} satisfies Story;
