import {
  ProjectCategoryFiltersForm,
  ProjectCategoryFiltersFormSkeleton,
} from "../ProjectCategoryFiltersForm";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { mockedProjectCategorySummaries } from "@/mocks/projectCategories";
import { ProjectCategoryFiltersModal } from "../ProjectCategoryFiltersModal";
import { withProjectFiltersProvider } from "../ProjectFiltersContext/__stories__";
import { withSelectedProjectsProvider } from "../SelectedProjectsContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";
import {
  withModalManagerProvider,
  withOpenModal,
} from "@/dashboard/common/ModalManagerContext/__stories__";

const meta = {
  title: "dashboard/projects/ProjectCategoryFiltersModal",
  component: ProjectCategoryFiltersModal,
  decorators: [
    withOpenModal,
    withProjectFiltersProvider,
    withSelectedProjectsProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "projectCategoryFilters",
  },
} satisfies Meta<typeof ProjectCategoryFiltersModal>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <ProjectCategoryFiltersForm
        categoryCheckboxGroupItems={mockedProjectCategorySummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <ProjectCategoryFiltersFormSkeleton />,
  },
} satisfies Story;
